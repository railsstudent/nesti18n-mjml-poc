import previewEmail = require('preview-email')
import Mail = require('nodemailer/lib/mailer')
import nodemailer = require('nodemailer')
import { Injectable } from '@nestjs/common'
import { CustomConfigService } from './app-config.service'

@Injectable()
export class MailerService {
  private readonly mailerFrom: string
  private readonly transport: nodemailer.Transporter

  constructor(private configService: CustomConfigService) {
    this.mailerFrom = this.configService.mailerFrom
    this.transport = nodemailer.createTransport({
      host: this.configService.smtpHost,
      port: this.configService.smtpPort,
      auth: {
        user: this.configService.smtpUser,
        pass: this.configService.smtpPassword,
      },
    })
  }

  async send(message: Mail.Options): Promise<void> {
    const nodeEnv = this.configService.nodeEnv
    const options = {
      ...message,
      from: this.mailerFrom,
    }

    if (nodeEnv === 'development') {
      await previewEmail(options)
    } else {
      await this.transport.sendMail(options)
    }
  }
}

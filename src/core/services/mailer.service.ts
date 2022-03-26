import previewEmail = require('preview-email')
import Mail = require('nodemailer/lib/mailer')
import nodemailer = require('nodemailer')
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailerService {
  private readonly mailerFrom: string
  private readonly transport: nodemailer.Transporter

  constructor(private configService: ConfigService) {
    this.mailerFrom = this.configService.get<string>('MAILER_FROM', '')
    this.transport = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', ''),
      port: this.configService.get<number>('SMTP_PORT', 0),
      auth: {
        user: this.configService.get<string>('SMTP_USER', ''),
        pass: this.configService.get<string>('SMTP_PASSWORD', ''),
      },
    })
  }

  async send(message: Mail.Options): Promise<void> {
    const nodeEnv = this.configService.get<string>('NODE_ENV')
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

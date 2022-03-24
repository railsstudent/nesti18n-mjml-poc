import { Injectable } from '@nestjs/common'
import previewEmail = require('preview-email')
import Mail = require('nodemailer/lib/mailer')

@Injectable()
export class MailerService {
  send(message: Mail.Options): Promise<string> {
    return previewEmail(message)
  }
}

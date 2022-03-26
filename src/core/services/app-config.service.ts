import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 0)
  }

  get mailerFrom(): string {
    return this.configService.get<string>('MAILER_FROM', '')
  }

  get smtpHost(): string {
    return this.configService.get<string>('SMTP_HOST', '')
  }

  get smtpPort(): number {
    return this.configService.get<number>('SMTP_PORT', 0)
  }

  get smtpUser(): string {
    return this.configService.get<string>('SMTP_USER', '')
  }

  get smtpPassword(): string {
    return this.configService.get<string>('SMTP_PASSWORD', '')
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development')
  }
}

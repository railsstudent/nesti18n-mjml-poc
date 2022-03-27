import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import * as path from 'path'
import { MailerService, MjmlService } from '@/core'
import { envConfig } from '@/config'
import { PasswordUpdatedDto, WelcomeUserDto } from '../dtos'
import { WelcomeUser } from '../interfaces'

@Injectable()
export class UserService {
  constructor(
    private mjmlService: MjmlService,
    private i18nService: I18nService,
    private mailerService: MailerService,
  ) {}

  sendWelcomeEmail(language: string, dto: WelcomeUserDto): Promise<void> {
    const currencyFormat = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    const total = this.calculateAnnualFee()
    const formattedTotal = currencyFormat.format(total)

    return this.renderWelcomeEmail(language, { ...dto, total: formattedTotal })
  }

  private calculateAnnualFee(): number {
    const max = 100
    const min = 1
    const total = Math.random() * max + min
    const monthsPerYear = 12
    return total * monthsPerYear
  }

  private async renderWelcomeEmail(lang: string, welcomeUser: WelcomeUser) {
    const { organization, name, total, email } = welcomeUser

    const title = await this.translate('email.welcomeUser.TITLE', { name }, lang)
    const welcomeText = await this.translate('email.welcomeUser.WELCOME', { organization }, lang)
    const membershipFee = await this.translate(
      'email.welcomeUser.MEMBERSHIP_FEE',
      { total, startDate: new Date(Date.now()).toISOString() },
      lang,
    )
    const thankYouText = await this.translate('email.welcomeUser.THANKS_AND_BEST_REGARDS', {}, lang)
    const admin = await this.translate('email.welcomeUser.ADMIN', {}, lang)
    const subject = await this.translate('email.welcomeUser.SUBJECT', {}, lang)

    const emailPath = path.join(envConfig.ROOT_PATH, 'src', 'user', 'templates', 'welcome-user.mjml')
    const html = this.mjmlService.renderMjml(emailPath, {
      title,
      welcomeText,
      membershipFee,
      thankYouText,
      organization,
      admin,
    })

    await this.mailerService.send({
      to: email,
      subject,
      html,
    })
  }

  private translate(key: string, args: Record<string, any>, lang: string) {
    if (Object.keys(args).length > 0) {
      return this.i18nService.translate(key, {
        args,
        lang,
      })
    }
    return this.i18nService.translate(key, { lang })
  }

  sendPasswordUpdatedEmail(language: string, dto: PasswordUpdatedDto): Promise<void> {
    return this.renderPasswordUpdatedEmail(language, dto)
  }

  private async renderPasswordUpdatedEmail(lang: string, dto: PasswordUpdatedDto) {
    const { email } = dto

    const title = await this.translate('email.passwordUpdated.TITLE', {}, lang)
    const message = await this.translate('email.passwordUpdated.MESSAGE', {}, lang)
    const subject = await this.translate('email.passwordUpdated.SUBJECT', {}, lang)
    const admin = await this.translate('email.passwordUpdated.ADMIN', {}, lang)

    const emailPath = path.join(envConfig.ROOT_PATH, 'src', 'user', 'templates', 'password-updated.mjml')
    const html = this.mjmlService.renderMjml(emailPath, {
      title,
      message,
      admin,
    })

    await this.mailerService.send({
      to: email,
      subject,
      html,
    })
  }
}

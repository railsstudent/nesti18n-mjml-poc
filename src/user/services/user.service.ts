import { MjmlService } from '@/core'
import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { WelcomeUserDto } from '../dtos'
import { WelcomeUser } from '../interfaces'

@Injectable()
export class UserService {
  constructor(private mjmlService: MjmlService, private i18nService: I18nService) {}

  sendWelcomeEmail(language: string, dto: WelcomeUserDto): Promise<string> {
    const currencyFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      currency: 'USD',
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
    const { organization, name, total } = welcomeUser
    const title = await this.i18nService.translate('email.welcomeUser.TITLE', {
      args: { name },
      lang,
    })

    const welcomeText = await this.i18nService.translate('email.welcomeUser.WELCOME', {
      args: { organization },
      lang,
    })

    const membershipFee = await this.i18nService.translate('email.welcomeUser.MEMBERSHIP_FEE', {
      args: { total, startDate: new Date(Date.now()).toISOString() },
      lang,
    })

    const thankYouText = await this.i18nService.translate('email.welcomeUser.THANKS_AND_BEST_REGARDS', {
      lang,
    })

    const admin = await this.i18nService.translate('email.welcomeUser.ADMIN', {
      lang,
    })

    return this.mjmlService.renderMjml('welcome-user.mjml', {
      title,
      welcomeText,
      membershipFee,
      thankYouText,
      organization,
      admin,
    })
  }
}

import { UserService } from '../services'
import { Body, Controller, Post } from '@nestjs/common'
import { I18nLang } from 'nestjs-i18n'
import { WelcomeUserDto } from '../dtos'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('welcome-user')
  sendWelcomeEmail(@I18nLang() language, @Body() dto: WelcomeUserDto): Promise<string> {
    return this.userService.sendWelcomeEmail(language, dto)
  }
}

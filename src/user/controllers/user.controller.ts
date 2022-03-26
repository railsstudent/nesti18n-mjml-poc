import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { I18nLang } from 'nestjs-i18n'
import { WelcomeUserDto } from '../dtos'
import { UserService } from '../services'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Send welcome user email',
  })
  @ApiBody({
    type: WelcomeUserDto,
    description: 'Return an instance of WelcomeUserDto',
  })
  @Post('welcome-user')
  sendWelcomeEmail(@I18nLang() language, @Body() dto: WelcomeUserDto): Promise<void> {
    return this.userService.sendWelcomeEmail(language, dto)
  }
}

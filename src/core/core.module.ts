import { Module } from '@nestjs/common'
import { AppConfigService, MailerService, MjmlService } from './services'

@Module({
  providers: [MjmlService, MailerService, AppConfigService],
  exports: [MjmlService, MailerService, AppConfigService],
})
export class CoreModule {}

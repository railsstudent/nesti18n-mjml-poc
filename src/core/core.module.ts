import { Module } from '@nestjs/common'
import { CustomConfigService, MailerService, MjmlService } from './services'

@Module({
  providers: [MjmlService, MailerService, CustomConfigService],
  exports: [MjmlService, MailerService, CustomConfigService],
})
export class CoreModule {}

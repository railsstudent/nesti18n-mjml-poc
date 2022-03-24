import { Module } from '@nestjs/common'
import { MailerService, MjmlService } from './services'

@Module({
  providers: [MjmlService, MailerService],
  exports: [MjmlService, MailerService],
})
export class CoreModule {}

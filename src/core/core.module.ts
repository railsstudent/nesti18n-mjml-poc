import { Module } from '@nestjs/common'
import { MjmlService } from './services'

@Module({
  providers: [MjmlService],
  exports: [MjmlService],
})
export class CoreModule {}

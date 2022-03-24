import { Module } from '@nestjs/common'
import { MjmlService } from './services'

@Module({
  providers: [MjmlService],
})
export class CoreModule {}

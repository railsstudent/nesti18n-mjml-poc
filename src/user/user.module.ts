import { Module } from '@nestjs/common'
import { CoreModule } from '@/core'
import { UserController } from './controllers'
import { UserService } from './services'

@Module({
  imports: [CoreModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

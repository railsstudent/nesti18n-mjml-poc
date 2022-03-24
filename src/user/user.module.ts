import { Module } from '@nestjs/common'
import { UserService } from './services'
import { UserController } from './controllers'
import { CoreModule } from '@/core'

@Module({
  imports: [CoreModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

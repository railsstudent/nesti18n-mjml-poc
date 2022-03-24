import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { envConfig } from './config/env'
import * as path from 'path'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  envConfig.ROOT_PATH = path.join(__dirname)
  await app.listen(3000)
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { envConfig } from './config/env'
import * as path from 'path'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import * as express from 'express'
import * as compression from 'compression'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors()
  app.use(helmet())
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  envConfig.ROOT_PATH = path.join(__dirname)
  const port = configService.get<number>('PORT', 0)
  await app.listen(port)
}
bootstrap()

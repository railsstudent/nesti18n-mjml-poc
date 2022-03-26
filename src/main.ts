import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as express from 'express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { envConfig } from './config/env'
import { AppConfigService } from './core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(AppConfigService)
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

  const config = new DocumentBuilder()
    .setTitle('Nestjs i18n Email example')
    .setDescription('Nestjs I18n Email API description')
    .setVersion('1.0')
    .addTag('i18n email')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  envConfig.ROOT_PATH = __dirname
  await app.listen(configService.port)
}
bootstrap()

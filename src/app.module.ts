import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n'
import * as path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core'
import { UserModule } from './user'

@Module({
  imports: [
    CoreModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['language'])],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        MAILER_FROM: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

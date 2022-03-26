import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n'
import * as path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core'
import { UserModule } from './user'
import { validationSchema } from './envSchema'

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
      validationSchema,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

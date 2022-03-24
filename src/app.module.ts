import { Module } from '@nestjs/common'
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core'
import * as path from 'path'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

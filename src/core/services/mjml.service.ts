import { Injectable } from '@nestjs/common'
import { template } from 'lodash'
import mjml2html = require('mjml')
import * as fs from 'fs'
import { AppConfigService } from './app-config.service'

@Injectable()
export class MjmlService {
  constructor(private configService: AppConfigService) {}

  renderMjml(templatePath: string, vars: Record<string, any>): string {
    const emailContent = fs.readFileSync(templatePath).toString()
    const compiled = template(emailContent)
    const translated = compiled(vars)

    const isProduction = this.configService.nodeEnv === 'production'
    const htmlOutput = mjml2html(translated, {
      minify: isProduction,
      keepComments: !isProduction,
    })

    return htmlOutput.html
  }
}

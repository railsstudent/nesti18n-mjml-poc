import { Injectable } from '@nestjs/common'
import { template } from 'lodash'
import mjml2html = require('mjml')
import * as fs from 'fs'
import * as path from 'path'
import { envConfig } from '@/config/env'
import { AppConfigService } from './app-config.service'

@Injectable()
export class MjmlService {
  constructor(private configService: AppConfigService) {}

  renderMjml(filename: string, vars: Record<string, any>): string {
    const templatePath = path.join(envConfig.ROOT_PATH, 'templates', filename)
    const emailContent = fs.readFileSync(templatePath).toString()
    const compiled = template(emailContent)
    const translated = compiled(vars)

    const htmlOutput = mjml2html(translated, {
      minify: this.configService.nodeEnv === 'production',
    })

    return htmlOutput.html
  }
}

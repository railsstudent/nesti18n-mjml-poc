import { envConfig } from '@/config/env'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import { template } from 'lodash'
import * as path from 'path'
import mjml2html = require('mjml')

@Injectable()
export class MjmlService {
  constructor(private configService: ConfigService) {}

  renderMjml(filename: string, vars: Record<string, any>): string {
    const templatePath = path.join(envConfig.ROOT_PATH, 'templates', filename)
    const emailContent = fs.readFileSync(templatePath).toString()
    const compiled = template(emailContent)
    const translated = compiled(vars)

    const htmlOutput = mjml2html(translated, {
      minify: this.configService.get<string>('NODE_ENV', '') === 'production',
    })

    return htmlOutput.html
  }
}

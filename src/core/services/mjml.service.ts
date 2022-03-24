import { envConfig } from '@/config/env'
import { Injectable } from '@nestjs/common'
import { template } from 'lodash'
import mjml2html = require('mjml')
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class MjmlService {
  renderMjml(filename: string, vars: Record<string, any>): string {
    const templatePath = path.join(envConfig.ROOT_PATH, 'templates', filename)
    const emailContent = fs.readFileSync(templatePath).toString()
    const compiled = template(emailContent)
    const translated = compiled(vars)

    const htmlOutput = mjml2html(translated, {
      minify: false,
    })

    console.log('html', htmlOutput.html)
    return htmlOutput.html
  }
}

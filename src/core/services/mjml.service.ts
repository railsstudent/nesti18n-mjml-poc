import { envConfig } from '@/config/env'
import { Injectable } from '@nestjs/common'
import { template } from 'lodash'
import mjml2html from 'mjml'
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class MjmlService {
  renderMjml(filename: string, vars: Record<string, any>): void {
    const templatePath = path.join(envConfig.ROOT_PATH, 'templates', filename)
    const emailContent = fs.readFileSync(templatePath).toString()
    console.log('templatePath', templatePath, 'emailContent', emailContent, 'vars', vars)

    const compiled = template(emailContent)
    const translated = compiled(vars)
    console.log('translated', translated)

    const htmlOutput = mjml2html(translated, {
      beautify: true,
      minify: false,
    })

    console.log(htmlOutput)
  }
}

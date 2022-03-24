import { Injectable } from '@nestjs/common'
import { template } from 'lodash'
import mjml2html from 'mjml'
@Injectable()
export class MjmlService {
  renderMjml(filename: string, vars: Record<string, any>): void {
    const compiled = template(filename)
    const translated = compiled(vars)

    const htmlOutput = mjml2html(translated, {
      beautify: true,
      minify: false,
    })

    console.log(htmlOutput)
  }
}

import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('/version')
  version(): { APP_VERSION: string } {
    return {
      APP_VERSION: process.env.APP_VERSION,
    }
  }
}

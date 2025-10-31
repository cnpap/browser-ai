import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("open-url")
  async openUrl(@Body() body: { url: string }) {
    return this.appService.openUrl(body.url);
  }
}

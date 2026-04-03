import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  @Public()
  @Get('stats')
  @ApiOperation({ summary: "Oldal statisztikák lekérése" })
  @ApiOkResponse({ description: "A kért statisztikák adatai" })
  @ApiNotFoundResponse({ description: "Az adatok nem találhatók" })
  getPublicStats() {
    return this.appService.getPublicStats();
  }
}
 
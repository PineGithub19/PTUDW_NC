import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Logger Controller')
@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('/search')
  search(@Query('date') date: string) {
    return this.loggerService.search(date);
  }
}

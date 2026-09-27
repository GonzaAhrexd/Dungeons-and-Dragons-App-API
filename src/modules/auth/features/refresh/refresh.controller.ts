import { Body, Controller, Post } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshDto } from './refresh.dto';

@Controller('auth')
export class RefreshController {
  constructor(private refreshService: RefreshService) {}

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.refreshService.execute(dto);
  }
}

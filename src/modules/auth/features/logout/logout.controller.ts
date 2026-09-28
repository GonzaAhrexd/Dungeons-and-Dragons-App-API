import { Controller, Post, Req } from '@nestjs/common';
import { LogoutService } from './logout.service';
import type { RequestWithUserId } from '@/common/guards/jwt-auth.guard';

@Controller('auth')
export class LogoutController {
  constructor(private logoutService: LogoutService) {}

  @Post('logout')
  async logout(@Req() req: RequestWithUserId) {
    await this.logoutService.execute(req.userId!);
  }
}

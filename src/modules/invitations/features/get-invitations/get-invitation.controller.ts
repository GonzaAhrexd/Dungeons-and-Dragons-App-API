import { Controller, Get, Req } from '@nestjs/common';
import { GetInvitationService } from './get-invitation.service';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';

@Controller('invitations')
export class GetInvitationController {
  constructor(private readonly getInvitationService: GetInvitationService) {}

  @Get('me')
  getMyInvitations(@Req() req: RequestWithUserId) {
    return this.getInvitationService.execute(req.userId ?? '');
  }
}

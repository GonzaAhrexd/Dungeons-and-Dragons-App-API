import { Controller, Param, Put, Req } from '@nestjs/common';
import { AcceptInvitationService } from './accept-invitation.service';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';

@Controller('invitations')
export class AcceptInvitationController {
  constructor(
    private readonly acceptInvitationService: AcceptInvitationService,
  ) {}

  @Put('accept/:id')
  acceptInvitation(
    @Param('id') invitationId: string,
    @Req() req: RequestWithUserId,
  ) {
    return this.acceptInvitationService.execute(invitationId, req.userId ?? '');
  }
}

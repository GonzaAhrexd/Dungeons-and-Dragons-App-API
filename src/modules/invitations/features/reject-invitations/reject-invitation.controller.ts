import { Controller, Param, Patch, Req } from '@nestjs/common';
import { RejectInvitationService } from './reject-invitation.service';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';

@Controller('invitations')
export class RejectInvitationController {
  constructor(
    private readonly rejectInvitationService: RejectInvitationService,
  ) {}

  @Patch('/:id')
  cancelInvitation(
    @Param('id') invitationId: string,
    @Req() req: RequestWithUserId,
  ) {
    return this.rejectInvitationService.execute(invitationId, req.userId ?? '');
  }
}

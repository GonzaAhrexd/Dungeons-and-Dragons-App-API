import { Controller, Delete, Param, Req } from '@nestjs/common';
import { CancelInvitationService } from './cancel-invitation.service';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';

@Controller('invitations')
export class CancelInvitationController {
  constructor(
    private readonly cancelInvitationService: CancelInvitationService,
  ) {}

  @Delete('/:id')
  cancelInvitation(
    @Param('id') invitationId: string,
    @Req() req: RequestWithUserId,
  ) {
    return this.cancelInvitationService.execute(invitationId, req.userId ?? '');
  }
}

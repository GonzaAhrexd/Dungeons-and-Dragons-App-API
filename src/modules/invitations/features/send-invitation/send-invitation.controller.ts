import { Body, Controller, Post, Req } from '@nestjs/common';
import { SendInvitationService } from './send-invitation.service';
import { SendInvitationDto } from './send-invitation.dto';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly sendInvitationService: SendInvitationService) {}

  @Post('send-invitation')
  send(@Body() dto: SendInvitationDto, @Req() req: RequestWithUserId) {
    return this.sendInvitationService.execute(dto, req.userId ?? '');
  }
}

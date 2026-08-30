import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schema/invitations.schema';
import {
  Campaign,
  CampaignSchema,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';

import {
  AcceptInvitationController,
  AcceptInvitationService,
  CancelInvitationController,
  CancelInvitationService,
  GetInvitationController,
  GetInvitationService,
  InvitationsController,
  SendInvitationService,
} from './features';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    InvitationsController,
    GetInvitationController,
    AcceptInvitationController,
    CancelInvitationController,
  ],
  providers: [
    SendInvitationService,
    GetInvitationService,
    AcceptInvitationService,
    CancelInvitationService,
  ],
})
export class InvitationsModule {}

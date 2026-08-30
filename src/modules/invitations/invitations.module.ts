import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schema/invitations.schema';
import {
  Campaign,
  CampaignSchema,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import { InvitationsController } from './features/send-invitation/send-invitation.controller';
import { SendInvitationService } from './features/send-invitation/send-invitation.service';
import { GetInvitationController } from './features/get-invitations/get-invitation.controller';
import { GetInvitationService } from './features/get-invitations/get-invitation.service';
import { AcceptInvitationController } from './features/accept-invitations/accept-invitation.controller';
import { AcceptInvitationService } from './features/accept-invitations/accept-invitation.service';

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
  ],
  providers: [
    SendInvitationService,
    GetInvitationService,
    AcceptInvitationService,
  ],
})
export class InvitationsModule {}

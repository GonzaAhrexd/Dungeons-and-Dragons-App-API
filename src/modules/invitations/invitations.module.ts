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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [InvitationsController],
  providers: [SendInvitationService],
})
export class InvitationsModule {}

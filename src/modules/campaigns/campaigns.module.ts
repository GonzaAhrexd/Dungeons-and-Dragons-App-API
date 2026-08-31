import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET } from '@/config/envs';
// Schemas
import { Campaign, CampaignSchema } from './schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import {
  Invitation,
  InvitationSchema,
} from '@/modules/invitations/schema/invitations.schema';
// Features
import {
  RemoveUserController,
  RemoveUserService,
  EditCampaignController,
  EditCampaignService,
  DeleteCampaignController,
  DeleteCampaignService,
  GetCampaignsController,
  GetCampaignsService,
  GetCampaignByIdController,
  GetCampaignByIdService,
  AddUserController,
  AddUserService,
  CampaignController,
  CreateCampaignService,
  JwtAuthGuard,
} from './features';
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
  controllers: [
    CampaignController,
    AddUserController,
    RemoveUserController,
    EditCampaignController,
    DeleteCampaignController,
    GetCampaignsController,
    GetCampaignByIdController,
  ],
  providers: [
    CreateCampaignService,
    AddUserService,
    RemoveUserService,
    EditCampaignService,
    DeleteCampaignService,
    GetCampaignsService,
    GetCampaignByIdService,
    JwtAuthGuard,
  ],
})
export class CampaignsModule {}

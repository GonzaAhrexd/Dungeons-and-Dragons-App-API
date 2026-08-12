import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignController,
  CreateCampaignService,
} from './features/create-campaign';
import { AddUserController, AddUserService } from './features/add-user';
import {
  RemoveUserController,
  RemoveUserService,
} from './features/remove-user';
import {
  EditCampaignController,
  EditCampaignService,
} from './features/edit-campaign';
import {
  DeleteCampaignController,
  DeleteCampaignService,
} from './features/delete-campaign';
import {
  GetCampaignsController,
  GetCampaignsService,
} from './features/get-campaigns';
import {
  GetCampaignByIdController,
  GetCampaignByIdService,
} from './features/get-campaign-by-id';
import { JwtAuthGuard } from './features/shared/campaign-auth.guard';
import {
  Campaign,
  CampaignSchema,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import { JWT_SECRET } from '@/config/envs';
import {
  Invitation,
  InvitationSchema,
} from '@/modules/invitations/schema/invitations.schema';
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

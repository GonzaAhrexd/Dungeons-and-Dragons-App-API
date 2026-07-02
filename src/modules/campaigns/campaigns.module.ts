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
  EditCampaignNameController,
  EditCampaignNameService,
} from './features/edit-name';
import {
  DeleteCampaignController,
  DeleteCampaignService,
} from './features/delete-campaign';
import {
  GetCampaignsController,
  GetCampaignsService,
} from './features/get-campaigns';
import { CampaignAuthGuard } from './features/shared/campaign-auth.guard';
import {
  Campaign,
  CampaignSchema,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import { JWT_SECRET } from '@/config/envs';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    CampaignController,
    AddUserController,
    RemoveUserController,
    EditCampaignNameController,
    DeleteCampaignController,
    GetCampaignsController,
  ],
  providers: [
    CreateCampaignService,
    AddUserService,
    RemoveUserService,
    EditCampaignNameService,
    DeleteCampaignService,
    GetCampaignsService,
    CampaignAuthGuard,
  ],
})
export class CampaignsModule {}

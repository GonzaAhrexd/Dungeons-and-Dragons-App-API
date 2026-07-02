import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignController,
  CreateCampaignService,
} from './features/create-campaign';
import { AddUserController, AddUserService } from './features/add-user';
import {
  Campaign,
  CampaignSchema,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CampaignController, AddUserController],
  providers: [CreateCampaignService, AddUserService],
})
export class CampaignsModule {}

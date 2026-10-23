import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import type { GetCampaignsResponse } from './interfaces/getCampaignsResponse';

@Injectable()
export class GetCampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(userId: string): Promise<GetCampaignsResponse[]> {
    const campaigns = await this.campaignModel
      .find(
        {
          $or: [{ gamemaster: userId }, { players: userId }],
        },
        {
          _id: 1,
          name: 1,
          description: 1,
          gamemaster: 1,
          isActive: 1,
          createdAt: 1,
        },
      )
      .lean<
        {
          _id: { toString(): string };
          name: string;
          description: string;
          gamemaster: { toString(): string } | string;
          isActive: boolean;
          createdAt: Date;
        }[]
      >()
      .exec();

    return campaigns.map((campaign) => ({
      campaignId: campaign._id.toString(),
      name: campaign.name,
      description: campaign.description,
      isGameMaster: campaign.gamemaster.toString() === userId,
      isActive: campaign.isActive,
      createdAt: campaign.createdAt,
    }));
  }
}

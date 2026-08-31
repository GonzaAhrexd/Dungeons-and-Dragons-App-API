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
    const [gameMasterCampaigns, playerCampaigns] = await Promise.all([
      this.campaignModel
        .find(
          { gamemaster: userId },
          { _id: 1, name: 1, description: 1, createdAt: 1 },
        )
        .lean<
          {
            _id: { toString(): string };
            name: string;
            description: string;
            createdAt: Date;
          }[]
        >()
        .exec(),
      this.campaignModel
        .find(
          { players: userId },
          { _id: 1, name: 1, description: 1, createdAt: 1 },
        )
        .lean<
          {
            _id: { toString(): string };
            name: string;
            description: string;
            createdAt: Date;
          }[]
        >()
        .exec(),
    ]);

    const campaignsById = new Map<string, GetCampaignsResponse>();

    for (const campaign of playerCampaigns) {
      campaignsById.set(campaign._id.toString(), {
        campaignId: campaign._id.toString(),
        name: campaign.name,
        description: campaign.description,
        isGameMaster: false,
        createdAt: campaign.createdAt,
      });
    }

    for (const campaign of gameMasterCampaigns) {
      campaignsById.set(campaign._id.toString(), {
        campaignId: campaign._id.toString(),
        name: campaign.name,
        description: campaign.description,
        isGameMaster: true,
        createdAt: campaign.createdAt,
      });
    }

    return [...campaignsById.values()];
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { GetCampaignByIdResponse } from './interfaces/getCampaignByIdResponse';

@Injectable()
export class GetCampaignByIdService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(
    campaignId: string,
    userId: string,
  ): Promise<GetCampaignByIdResponse> {
    const campaign = await this.campaignModel
      .findById(campaignId, { _id: 1, name: 1, description: 1, gamemaster: 1 })
      .lean<{
        _id: { toString(): string };
        name: string;
        description: string;
        gamemaster: { toString(): string } | string;
      }>()
      .exec();

    if (!campaign) throw new NotFoundException('Campaign not found');

    return {
      campaignId: campaign._id.toString(),
      name: campaign.name,
      description: campaign.description,
      isGameMaster: campaign.gamemaster.toString() === userId,
    };
  }
}

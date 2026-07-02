import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { DeleteCampaignDto } from './delete-campaign.dto';
import type { DeleteCampaignResponse } from './interfaces/deleteCampaignResponse';

@Injectable()
export class DeleteCampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(dto: DeleteCampaignDto): Promise<DeleteCampaignResponse> {
    const campaignExists = await this.campaignModel.exists({
      _id: dto.campaignId,
    });

    if (!campaignExists) {
      throw new BadRequestException('Campaign not found');
    }

    const campaign = await this.campaignModel.findByIdAndDelete(dto.campaignId);

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    const { _id, name, gamemaster, players, createdAt, updatedAt } =
      campaign.toObject();

    return {
      id: _id.toString(),
      name,
      gamemaster: gamemaster.toString(),
      players,
      createdAt,
      updatedAt,
    };
  }
}

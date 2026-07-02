import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { EditNameDto } from './edit-name.dto';
import type { EditCampaignNameResponse } from './interfaces/editCampaignNameResponse';

@Injectable()
export class EditCampaignNameService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(dto: EditNameDto): Promise<EditCampaignNameResponse> {
    const campaignExists = await this.campaignModel.exists({
      _id: dto.campaignId,
    });

    if (!campaignExists) {
      throw new BadRequestException('Campaign not found');
    }

    const campaign = await this.campaignModel.findByIdAndUpdate(
      dto.campaignId,
      { $set: { name: dto.name } },
      { new: true },
    );

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

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { EditNameDto } from './edit-campaign.dto';
import type { EditCampaignResponse } from './interfaces/editCampaignResponse';

@Injectable()
export class EditCampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(id: string, dto: EditNameDto): Promise<EditCampaignResponse> {
    const campaignExists = await this.campaignModel.exists({
      _id: id,
    });

    if (!campaignExists) {
      throw new BadRequestException('Campaign not found');
    }

    const campaign = await this.campaignModel.findByIdAndUpdate(
      id,
      { $set: { name: dto.name, description: dto.description } },
      { returnDocument: 'after' },
    );

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    const {
      _id,
      name,
      description,
      gamemaster,
      players,
      createdAt,
      updatedAt,
    } = campaign.toObject();

    return {
      id: _id.toString(),
      name,
      description,
      gamemaster: gamemaster.toString(),
      players,
      createdAt,
      updatedAt,
    };
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';

import { User, UserDocument } from '../../../auth/schema/user.schema';
import { CreateCampaignDto } from './create-campaign.dto';
import { CreateCampaignResponse } from './interfaces/createCampaignsResponse';

@Injectable()
export class CreateCampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async execute(dto: CreateCampaignDto): Promise<CreateCampaignResponse> {
    const gamemasterExists = await this.userModel.exists({
      _id: dto.gamemaster,
    });

    if (!gamemasterExists) {
      throw new BadRequestException('Gamemaster not found');
    }

    const campaign = await this.campaignModel.create({
      name: dto.name,
      gamemaster: dto.gamemaster,
    });
    const { id, name, gamemaster, players, createdAt, updatedAt } =
      campaign.toObject();
    return {
      id,
      name,
      gamemaster: gamemaster.toString(),
      players,
      createdAt,
      updatedAt,
    };
  }
}

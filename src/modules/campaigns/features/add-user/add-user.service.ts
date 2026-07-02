import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { User, UserDocument } from '../../../auth/schema/user.schema';
import { AddUserDto } from './add-user.dto';
import type { AddUserResponse } from './interfaces/addUserResponse';

@Injectable()
export class AddUserService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async execute(dto: AddUserDto): Promise<AddUserResponse> {
    const [campaignExists, playerExists] = await Promise.all([
      this.campaignModel.exists({ _id: dto.campaignId }),
      this.userModel.exists({ _id: dto.playerId }),
    ]);

    if (!campaignExists) {
      throw new BadRequestException('Campaign not found');
    }

    if (!playerExists) {
      throw new BadRequestException('Player not found');
    }

    const campaign = await this.campaignModel.findByIdAndUpdate(
      dto.campaignId,
      { $addToSet: { players: dto.playerId } },
      { new: true },
    );

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

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

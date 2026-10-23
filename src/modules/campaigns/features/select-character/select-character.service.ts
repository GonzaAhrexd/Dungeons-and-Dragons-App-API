import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Character,
  CharacterDocument,
} from '@/modules/characters/schema/character.schema';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { SelectCharacterDto } from './select-character.dto';
import type { SelectCharacterResponse } from './interfaces/selectCharacterResponse';

@Injectable()
export class SelectCharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async execute(
    dto: SelectCharacterDto,
    userId: string,
  ): Promise<SelectCharacterResponse> {
    const [character, campaign] = await Promise.all([
      this.characterModel
        .findById(dto.characterId, { userId: 1 })
        .lean()
        .exec(),
      this.campaignModel
        .findById(dto.campaignId, { gamemaster: 1, players: 1 })
        .lean()
        .exec(),
    ]);

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (character.userId !== userId) {
      throw new ForbiddenException(
        'You can only select characters you created',
      );
    }

    const isCampaignMember =
      campaign.gamemaster.toString() === userId ||
      campaign.players.some((player) => player.toString() === userId);

    if (!isCampaignMember) {
      throw new ForbiddenException(
        'You can only select a character in a campaign you belong to',
      );
    }

    const selectedCharacter = await this.characterModel
      .findOneAndUpdate(
        { _id: dto.characterId, userId },
        { $set: { campaignId: dto.campaignId } },
        { returnDocument: 'after' },
      )
      .lean()
      .exec();

    if (!selectedCharacter) {
      throw new BadRequestException('Character could not be selected');
    }

    return {
      characterId: selectedCharacter._id.toString(),
      campaignId: selectedCharacter.campaignId,
      userId: selectedCharacter.userId,
    };
  }
}

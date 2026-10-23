import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../../schema/character.schema';
import type { GetCharacterByIdResponse } from './interfaces/getCharacterByIdResponse';

@Injectable()
export class GetCharacterByIdService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async execute(characterId: string): Promise<GetCharacterByIdResponse> {
    const character = await this.characterModel
      .findById(characterId)
      .lean()
      .exec();

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return {
      id: character._id.toString(),
      userId: character.userId,
      campaignId: character.campaignId,
      name: character.name,
      race: character.race,
      class: character.class,
      subclass: character.subclass,
      alignment: character.alignment,
      level: character.level,
      bars: character.bars,
      currentState: character.currentState,
      attributes: character.attributes,
      inventory: character.inventory,
      equipment: character.equipment,
      backstory: character.backstory,
      objective: character.objective,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
    };
  }
}

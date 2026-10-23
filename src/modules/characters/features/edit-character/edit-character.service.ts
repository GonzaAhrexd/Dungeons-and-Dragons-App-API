import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../../schema/character.schema';
import { EditCharacterDto } from './edit-character.dto';
import type { EditCharacterResponse } from './interfaces/editCharacterResponse';

@Injectable()
export class EditCharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async execute(
    characterId: string,
    userId: string,
    dto: EditCharacterDto,
  ): Promise<EditCharacterResponse> {
    const existingCharacter = await this.characterModel
      .findById(characterId, { userId: 1 })
      .lean()
      .exec();

    if (!existingCharacter) {
      throw new NotFoundException('Character not found');
    }

    if (existingCharacter.userId !== userId) {
      throw new ForbiddenException('You can only edit characters you created');
    }

    const set: Record<string, unknown> = {};

    for (const [field, value] of Object.entries(dto)) {
      if (field !== 'attributes' && value !== undefined) {
        set[field] = value;
      }
    }

    if (dto.attributes) {
      for (const [attribute, value] of Object.entries(dto.attributes)) {
        if (value !== undefined) {
          set[`attributes.${attribute}`] = value;
        }
      }
    }

    const character = await this.characterModel
      .findOneAndUpdate(
        { _id: characterId, userId },
        { $set: set },
        { returnDocument: 'after' },
      )
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

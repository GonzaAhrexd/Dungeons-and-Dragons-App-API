import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../../schema/character.schema';
import { DeleteCharacterDto } from './delete-character.dto';
import type { DeleteCharacterResponse } from './interfaces/deleteCharacterResponse';

@Injectable()
export class DeleteCharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async execute(
    characterId: string,
    userId: string,
    dto: DeleteCharacterDto,
  ): Promise<DeleteCharacterResponse> {
    const character = await this.characterModel
      .findById(characterId, { userId: 1, name: 1 })
      .lean()
      .exec();

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (character.userId !== userId) {
      throw new ForbiddenException(
        'You can only delete characters you created',
      );
    }

    if (character.name !== dto.name) {
      throw new BadRequestException('Character name does not match');
    }

    const deletedCharacter = await this.characterModel
      .findOneAndDelete({
        _id: characterId,
        userId,
        name: dto.name,
      })
      .lean()
      .exec();

    if (!deletedCharacter) {
      throw new NotFoundException('Character not found');
    }

    return {
      id: deletedCharacter._id.toString(),
      userId: deletedCharacter.userId,
      name: deletedCharacter.name,
      deletedAt: new Date(),
    };
  }
}

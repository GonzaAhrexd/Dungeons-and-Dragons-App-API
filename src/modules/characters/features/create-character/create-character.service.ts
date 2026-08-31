import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../../auth/schema/user.schema';
import { Character, CharacterDocument } from '../../schema/character.schema';
import { CreateCharacterDto } from './create-character.dto';
import { CreateCharacterResponse } from './interfaces/createCharacterResponse';

@Injectable()
export class CreateCharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async execute(
    dto: CreateCharacterDto,
    userId: string,
  ): Promise<CreateCharacterResponse> {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const character = await this.characterModel.create({
      userId,
      name: dto.name,
      race: dto.race,
      class: dto.class,
      subclass: dto.subclass,
      alignment: dto.alignment,
      level: dto.level,
      history: dto.history,
      objective: dto.objective,
    });

    const { _id, userId: ownerId, createdAt, updatedAt } = character.toObject();

    return {
      id: _id.toString(),
      userId: ownerId.toString(),
      createdAt,
      updatedAt,
    };
  }
}

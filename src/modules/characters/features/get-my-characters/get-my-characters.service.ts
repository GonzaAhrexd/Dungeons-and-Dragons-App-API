import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../../schema/character.schema';
import type { GetMyCharactersResponse } from './interfaces/getMyCharactersResponse';

@Injectable()
export class GetMyCharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async execute(userId: string): Promise<GetMyCharactersResponse[]> {
    const characters = await this.characterModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return characters.map((character) => ({
      id: character._id.toString(),
      userId: character.userId,
      name: character.name,
      race: character.race,
      class: character.class,
      subclass: character.subclass,
      level: character.level,
      attributes: {
        strength: character.attributes.strength,
        dexterity: character.attributes.dexterity,
        constitution: character.attributes.constitution,
        intelligence: character.attributes.intelligence,
        wisdom: character.attributes.wisdom,
        charisma: character.attributes.charisma,
      },
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
    }));
  }
}

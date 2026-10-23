import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import {
  Character,
  CharacterSchema,
} from '@/modules/characters/schema/character.schema';
import {
  CharacterController,
  CreateCharacterService,
  DeleteCharacterController,
  DeleteCharacterService,
  EditCharacterController,
  EditCharacterService,
  GetCharacterByIdController,
  GetCharacterByIdService,
  GetMyCharactersController,
  GetMyCharactersService,
} from './features';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    CharacterController,
    GetMyCharactersController,
    GetCharacterByIdController,
    EditCharacterController,
    DeleteCharacterController,
  ],
  providers: [
    CreateCharacterService,
    GetMyCharactersService,
    GetCharacterByIdService,
    EditCharacterService,
    DeleteCharacterService,
  ],
})
export class CharactersModule {}

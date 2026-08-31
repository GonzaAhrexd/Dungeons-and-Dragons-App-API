import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/auth/schema/user.schema';
import {
  Character,
  CharacterSchema,
} from '@/modules/characters/schema/character.schema';
import { CharacterController, CreateCharacterService } from './features';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CreateCharacterService],
})
export class CharactersModule {}

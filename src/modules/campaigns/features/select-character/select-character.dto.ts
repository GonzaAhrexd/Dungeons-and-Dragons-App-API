import { IsMongoId, IsString } from 'class-validator';

export class SelectCharacterDto {
  @IsMongoId()
  @IsString()
  characterId!: string;

  @IsMongoId()
  @IsString()
  campaignId!: string;
}

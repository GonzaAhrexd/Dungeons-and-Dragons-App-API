import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsMongoId()
  gamemaster!: string;
}

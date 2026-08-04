import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @MinLength(3)
  name!: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId()
  gamemaster!: string;
}

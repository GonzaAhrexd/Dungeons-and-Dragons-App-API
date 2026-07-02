import { IsMongoId, IsString, MinLength } from 'class-validator';

export class EditNameDto {
  @IsMongoId()
  campaignId!: string;

  @IsString()
  @MinLength(3)
  name!: string;
}

import { IsMongoId } from 'class-validator';

export class AddUserDto {
  @IsMongoId()
  campaignId!: string;

  @IsMongoId()
  playerId!: string;
}

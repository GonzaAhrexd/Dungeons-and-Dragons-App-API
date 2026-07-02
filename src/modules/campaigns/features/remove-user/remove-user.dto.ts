import { IsMongoId } from 'class-validator';

export class RemoveUserDto {
  @IsMongoId()
  campaignId!: string;

  @IsMongoId()
  playerId!: string;
}

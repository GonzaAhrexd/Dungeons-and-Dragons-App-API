import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RemoveUserDto {
  @ApiProperty()
  @IsMongoId()
  campaignId!: string;
  @ApiProperty()
  @IsMongoId()
  playerId!: string;
}

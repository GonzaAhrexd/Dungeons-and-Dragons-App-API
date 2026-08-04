import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AddUserDto {
  @ApiProperty()
  @IsMongoId()
  campaignId!: string;
  @ApiProperty()
  @IsMongoId()
  playerId!: string;
}

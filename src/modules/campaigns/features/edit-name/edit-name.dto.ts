import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MinLength } from 'class-validator';

export class EditNameDto {
  @IsMongoId()
  @ApiProperty()
  campaignId!: string;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name!: string;
}

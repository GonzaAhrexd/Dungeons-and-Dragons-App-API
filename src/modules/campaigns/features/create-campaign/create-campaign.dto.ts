import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsMongoId()
  gamemaster!: string;
}

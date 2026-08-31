import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name!: string;
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  race?: string;
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  class?: string;
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  subclass?: string;
  @ApiPropertyOptional()
  @IsString()
  @MinLength(3)
  @IsOptional()
  alignment?: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  level?: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  history?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  objective?: string;
}

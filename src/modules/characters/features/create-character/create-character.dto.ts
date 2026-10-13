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
  alignment?: string;
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
  @IsNumber()
  @IsOptional()
  level?: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  backstory?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  objective?: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  strength?: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  dexterity?: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  constitution?: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  intelligence?: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  wisdom?: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  charisma?: number;
}

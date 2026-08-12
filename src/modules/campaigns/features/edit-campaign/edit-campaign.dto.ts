import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class EditNameDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  description?: string;
}

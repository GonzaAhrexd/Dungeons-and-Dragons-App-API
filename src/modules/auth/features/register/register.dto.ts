import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  username!: string;
  @IsString()
  @MinLength(8)
  @ApiProperty()
  password!: string;
}

import { IsString, MinLength } from 'class-validator';

export class DeleteCharacterDto {
  @IsString()
  @MinLength(1)
  name!: string;
}

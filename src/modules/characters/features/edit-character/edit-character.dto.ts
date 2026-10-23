import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class EditCharacterBarDto {
  @IsString()
  name!: string;

  @IsNumber()
  total!: number;

  @IsNumber()
  actual!: number;

  @IsString()
  color!: string;
}

class EditCharacterAttributeDto {
  @IsNumber()
  @IsOptional()
  strength?: number;

  @IsNumber()
  @IsOptional()
  dexterity?: number;

  @IsNumber()
  @IsOptional()
  constitution?: number;

  @IsNumber()
  @IsOptional()
  intelligence?: number;

  @IsNumber()
  @IsOptional()
  wisdom?: number;

  @IsNumber()
  @IsOptional()
  charisma?: number;
}

class EditCharacterInventoryItemDto {
  @IsString()
  name!: string;

  @IsString()
  notes!: string;

  @IsNumber()
  quantity!: number;
}

class EditCharacterEquipmentItemDto {
  @IsString()
  icon!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}

export class EditCharacterDto {
  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  race?: string;

  @IsString()
  @IsOptional()
  class?: string;

  @IsString()
  @IsOptional()
  subclass?: string;

  @IsString()
  @IsOptional()
  alignment?: string;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditCharacterBarDto)
  @IsOptional()
  bars?: EditCharacterBarDto[];

  @IsString()
  @IsOptional()
  currentState?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EditCharacterAttributeDto)
  @IsOptional()
  attributes?: EditCharacterAttributeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditCharacterInventoryItemDto)
  @IsOptional()
  inventory?: EditCharacterInventoryItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditCharacterEquipmentItemDto)
  @IsOptional()
  equipment?: EditCharacterEquipmentItemDto[];

  @IsString()
  @IsOptional()
  backstory?: string;

  @IsString()
  @IsOptional()
  objective?: string;
}

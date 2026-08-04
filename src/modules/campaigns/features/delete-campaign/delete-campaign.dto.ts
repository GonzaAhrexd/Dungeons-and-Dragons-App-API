import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteCampaignDto {
  @ApiProperty()
  @IsMongoId()
  campaignId!: string;
}

import { IsMongoId } from 'class-validator';

export class DeleteCampaignDto {
  @IsMongoId()
  campaignId!: string;
}

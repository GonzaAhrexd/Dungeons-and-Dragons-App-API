import { Body, Controller, Post } from '@nestjs/common';
import { CreateCampaignService } from './create-campaign.service';
import { CreateCampaignDto } from './create-campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly createCampaignService: CreateCampaignService) {}

  @Post()
  async create(@Body() dto: CreateCampaignDto) {
    return this.createCampaignService.execute(dto);
  }
}

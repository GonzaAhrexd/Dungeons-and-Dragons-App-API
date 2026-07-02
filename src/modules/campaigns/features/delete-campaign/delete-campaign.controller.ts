import { Body, Controller, Delete } from '@nestjs/common';
import { DeleteCampaignDto } from './delete-campaign.dto';
import { DeleteCampaignService } from './delete-campaign.service';

@Controller('campaigns')
export class DeleteCampaignController {
  constructor(private readonly deleteCampaignService: DeleteCampaignService) {}

  @Delete('delete-campaign')
  async deleteCampaign(@Body() dto: DeleteCampaignDto) {
    return this.deleteCampaignService.execute(dto);
  }
}

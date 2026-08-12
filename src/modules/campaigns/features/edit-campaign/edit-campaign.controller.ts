import { Body, Controller, Param, Patch } from '@nestjs/common';
import { EditNameDto } from './edit-campaign.dto';
import { EditCampaignService } from './edit-campaign.service';

@Controller('campaigns')
export class EditCampaignController {
  constructor(private readonly editCampaignNameService: EditCampaignService) {}

  @Patch(':id')
  async editName(@Param('id') id: string, @Body() dto: EditNameDto) {
    return this.editCampaignNameService.execute(id, dto);
  }
}

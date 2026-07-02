import { Body, Controller, Patch } from '@nestjs/common';
import { EditNameDto } from './edit-name.dto';
import { EditCampaignNameService } from './edit-name.service';

@Controller('campaigns')
export class EditCampaignNameController {
  constructor(
    private readonly editCampaignNameService: EditCampaignNameService,
  ) {}

  @Patch('edit-name')
  async editName(@Body() dto: EditNameDto) {
    return this.editCampaignNameService.execute(dto);
  }
}

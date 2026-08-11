import { Controller, Get, Param, Req } from '@nestjs/common';
import { GetCampaignByIdService } from './get-campaign-by-id.service';
import type { GetCampaignByIdResponse } from './interfaces/getCampaignByIdResponse';
import type { RequestWithUserId } from '../shared/campaign-auth.guard';

@Controller('campaigns')
export class GetCampaignByIdController {
  constructor(
    private readonly getCampaignByIdService: GetCampaignByIdService,
  ) {}

  @Get(':id')
  async getById(
    @Req() request: RequestWithUserId,
    @Param('id') id: string,
  ): Promise<GetCampaignByIdResponse> {
    return this.getCampaignByIdService.execute(id, request.userId ?? '');
  }
}

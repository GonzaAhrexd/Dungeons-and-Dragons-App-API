import { Controller, Get, Req } from '@nestjs/common';
import { GetCampaignsService } from './get-campaigns.service';
import type { GetCampaignsResponse } from './interfaces/getCampaignsResponse';
import { RequestWithUserId } from '../shared/campaign-auth.guard';

@Controller('campaigns')
export class GetCampaignsController {
  constructor(private readonly getCampaignsService: GetCampaignsService) {}

  @Get('me')
  async getMyCampaigns(
    @Req() request: RequestWithUserId,
  ): Promise<GetCampaignsResponse[]> {
    return this.getCampaignsService.execute(request.userId ?? '');
  }
}

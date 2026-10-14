import { Controller, Get, Req } from '@nestjs/common';

import type { RequestWithUserId } from '../../../../common/guards/jwt-auth.guard';
import type { GetMyCharactersResponse } from './interfaces/getMyCharactersResponse';
import { GetMyCharactersService } from './get-my-characters.service';

@Controller('character')
export class GetMyCharactersController {
  constructor(
    private readonly getMyCharactersService: GetMyCharactersService,
  ) {}

  @Get('me')
  getMyCharacters(
    @Req() request: RequestWithUserId,
  ): Promise<GetMyCharactersResponse[]> {
    return this.getMyCharactersService.execute(request.userId ?? '');
  }
}

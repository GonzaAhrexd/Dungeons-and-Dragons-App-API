import { Body, Controller, Put, Req } from '@nestjs/common';

import type { RequestWithUserId } from '../../../../common/guards/jwt-auth.guard';
import { SelectCharacterDto } from './select-character.dto';
import { SelectCharacterService } from './select-character.service';
import type { SelectCharacterResponse } from './interfaces/selectCharacterResponse';

@Controller('campaigns')
export class SelectCharacterController {
  constructor(
    private readonly selectCharacterService: SelectCharacterService,
  ) {}

  @Put('select-character')
  selectCharacter(
    @Body() dto: SelectCharacterDto,
    @Req() request: RequestWithUserId,
  ): Promise<SelectCharacterResponse> {
    return this.selectCharacterService.execute(dto, request.userId ?? '');
  }
}

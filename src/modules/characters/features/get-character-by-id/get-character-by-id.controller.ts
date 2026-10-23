import { Controller, Get, Param } from '@nestjs/common';

import type { GetCharacterByIdResponse } from './interfaces/getCharacterByIdResponse';
import { GetCharacterByIdService } from './get-character-by-id.service';

@Controller('character')
export class GetCharacterByIdController {
  constructor(
    private readonly getCharacterByIdService: GetCharacterByIdService,
  ) {}

  @Get(':id')
  getCharacterById(@Param('id') id: string): Promise<GetCharacterByIdResponse> {
    return this.getCharacterByIdService.execute(id);
  }
}

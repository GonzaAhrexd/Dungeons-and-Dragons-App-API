import { Body, Controller, Delete, Param, Req } from '@nestjs/common';

import type { RequestWithUserId } from '../../../../common/guards/jwt-auth.guard';
import { DeleteCharacterDto } from './delete-character.dto';
import { DeleteCharacterService } from './delete-character.service';
import type { DeleteCharacterResponse } from './interfaces/deleteCharacterResponse';

@Controller('character')
export class DeleteCharacterController {
  constructor(
    private readonly deleteCharacterService: DeleteCharacterService,
  ) {}

  @Delete(':id')
  deleteCharacter(
    @Param('id') id: string,
    @Body() dto: DeleteCharacterDto,
    @Req() request: RequestWithUserId,
  ): Promise<DeleteCharacterResponse> {
    return this.deleteCharacterService.execute(
      id,
      request.userId ?? '',
      dto,
    );
  }
}

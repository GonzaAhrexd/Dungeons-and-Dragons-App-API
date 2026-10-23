import { Body, Controller, Param, Patch, Req } from '@nestjs/common';

import type { RequestWithUserId } from '../../../../common/guards/jwt-auth.guard';
import type { EditCharacterResponse } from './interfaces/editCharacterResponse';
import { EditCharacterDto } from './edit-character.dto';
import { EditCharacterService } from './edit-character.service';

@Controller('character')
export class EditCharacterController {
  constructor(private readonly editCharacterService: EditCharacterService) {}

  @Patch(':id')
  editCharacter(
    @Req() request: RequestWithUserId,
    @Param('id') id: string,
    @Body() dto: EditCharacterDto,
  ): Promise<EditCharacterResponse> {
    return this.editCharacterService.execute(id, request.userId ?? '', dto);
  }
}

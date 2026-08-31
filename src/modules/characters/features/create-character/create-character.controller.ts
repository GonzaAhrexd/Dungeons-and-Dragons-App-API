import { Body, Controller, Post, Req } from '@nestjs/common';
import type { RequestWithUserId } from '../../../campaigns/features/shared/campaign-auth.guard';
import { CreateCharacterService } from './create-character.service';
import { CreateCharacterDto } from './create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(
    private readonly createCharacterService: CreateCharacterService,
  ) {}

  @Post()
  async create(@Body() dto: CreateCharacterDto, @Req() req: RequestWithUserId) {
    return this.createCharacterService.execute(dto, req.userId ?? '');
  }
}

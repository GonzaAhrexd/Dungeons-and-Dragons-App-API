import { Body, Controller, Put } from '@nestjs/common';
import { RemoveUserDto } from './remove-user.dto';
import { RemoveUserService } from './remove-user.service';

@Controller('campaigns')
export class RemoveUserController {
  constructor(private readonly removeUserService: RemoveUserService) {}

  @Put('remove-user')
  async removeUser(@Body() dto: RemoveUserDto) {
    return this.removeUserService.execute(dto);
  }
}

import { Body, Controller, Put } from '@nestjs/common';
import { AddUserDto } from './add-user.dto';
import { AddUserService } from './add-user.service';

@Controller('campaigns')
export class AddUserController {
  constructor(private readonly addUserService: AddUserService) {}

  @Put('add-user')
  async addUser(@Body() dto: AddUserDto) {
    return this.addUserService.execute(dto);
  }
}

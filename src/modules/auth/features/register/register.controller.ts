import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerService.execute(dto);
  }
}

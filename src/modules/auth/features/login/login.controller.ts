import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginService.execute(dto);
  }
}

import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto } from 'src/dtos/UserLoginDto';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('/login')
  registerUser(@Body() userLoginDto: UserLoginDto) {
    return this.authService.send({ role: 'auth', cmd: 'login' }, userLoginDto);
  }
}

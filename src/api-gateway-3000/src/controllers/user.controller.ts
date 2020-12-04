import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRegisterDto } from 'src/dtos/UserRegisterDto';

@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('/user')
  registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.send(
      { role: 'user', cmd: 'create' },
      userRegisterDto,
    );
  }
}

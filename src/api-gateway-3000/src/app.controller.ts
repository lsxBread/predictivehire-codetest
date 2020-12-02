import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDto } from './dtos/UserLoginDto';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Get('/user/:name')
  getUserByName(@Param('name') name: string) {
    return this.userService.send({ cmd: 'hello' }, name);
  }

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    this.logger.log(`login: ${JSON.stringify(userLoginDto)}`);

    return this.authService.send({ cmd: 'auth' }, userLoginDto);
  }
}

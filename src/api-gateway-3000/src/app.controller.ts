import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user/:name')
  getUserByName(@Param('name') name: string) {
    return this.userService.send({ cmd: 'hello' }, name);
  }

  @Post('/user')
  registerUser(@Body() createUserDto: any) {
    return this.userService.send(
      { role: 'user', cmd: 'create' },
      createUserDto,
    );
  }
}

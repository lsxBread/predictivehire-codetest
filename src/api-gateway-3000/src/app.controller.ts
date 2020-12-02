import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class AppController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Get(':name')
  getUserByName(@Param('name') name: string) {
    return this.client.send({ cmd: 'hello' }, name);
  }
}

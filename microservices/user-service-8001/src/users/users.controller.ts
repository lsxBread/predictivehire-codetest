import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ role: 'user', cmd: 'create' })
  createNewUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ role: 'user', cmd: 'findByName' })
  async findUserByName(username: string) {
    return this.usersService.findByUserName(username);
  }
}

import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from '../dtos/user/registerUser.dto';
import { DtoValidationPipe } from '../pipes/dtoValidation.pipe';
import { UserResponseDto } from '../dtos/user/userResponse.dto';

@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('/user')
  registerUser(
    @Body(new DtoValidationPipe()) registerUserDto: RegisterUserDto,
  ): Promise<UserResponseDto> {
    return this.userService
      .send({ role: 'user', cmd: 'create' }, registerUserDto)
      .toPromise();
  }
}

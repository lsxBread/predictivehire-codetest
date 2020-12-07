import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '../dtos/auth/login.dto';
import { NotFoundInterceptor } from '../interceptors/NotFoundInterceptor';
import { DtoValidationPipe } from '../pipes/dtoValidation.pipe';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('/login')
  @UseInterceptors(
    new NotFoundInterceptor('Correct username and password not found'),
  )
  registerUser(@Body(new DtoValidationPipe()) loginDto: LoginDto) {
    return this.authService
      .send({ role: 'auth', cmd: 'login' }, loginDto)
      .toPromise();
  }
}

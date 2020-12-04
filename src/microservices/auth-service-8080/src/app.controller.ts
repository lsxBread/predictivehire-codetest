import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ role: 'auth', cmd: 'login' })
  @UseGuards(LocalAuthGuard)
  async login(req) {
    return this.authService.login(req.loggedUser);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      this.logger.log(e);
      return false;
    }
  }
}

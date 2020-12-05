import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ role: 'auth', cmd: 'login' })
  @UseGuards(LocalAuthGuard)
  async login(req) {
    if (req.loggedUser) {
      return this.authService.login(req.loggedUser);
    }
    return null;
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

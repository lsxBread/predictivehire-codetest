import { Controller, UseGuards, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(LocalAuthGuard)
  @MessagePattern({ cmd: 'auth' })
  async login(req) {
    this.logger.log(req);
    // return this.authService.login(req.user);
  }
}

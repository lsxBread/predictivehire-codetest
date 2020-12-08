import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { username, password } = req;

    const user = await this.authService.validateUser(username, password);

    req.loggedUser = user;

    return true;
  }
}

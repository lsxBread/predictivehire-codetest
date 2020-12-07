import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwt = request.headers['authorization']?.split(' ')[1];

    if (!jwt) {
      throw new UnauthorizedException('No accessToken');
    }

    const { role: requestRole } = jwt_decode(jwt) as any;

    if (!requiredRoles.some(role => requestRole === role)) {
      throw new UnauthorizedException(
        'The user has no authorization to perform request',
      );
    }

    return true;
  }
}

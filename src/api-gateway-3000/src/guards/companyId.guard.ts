import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwt_decode from 'jwt-decode';

@Injectable()
export class CompanyIdGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { query } = request;
    const jwt = request.headers['authorization']?.split(' ')[1];

    if (!jwt) {
      throw new UnauthorizedException('No accessToken');
    }

    const { companyId } = jwt_decode(jwt) as any;

    if (!query.company_id) {
      throw new BadRequestException('No company_id query');
    }

    if (companyId !== query.company_id) {
      throw new UnauthorizedException('The user not belongs to company_id');
    }

    return true;
  }
}

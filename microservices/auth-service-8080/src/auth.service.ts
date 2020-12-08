import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService
      .send({ role: 'user', cmd: 'findByName' }, username)
      .pipe(
        timeout(5000),
        catchError(err => {
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      )
      .toPromise();

    if (!user || (user && user.password !== password)) {
      return null;
    }

    const { password: userPassword, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const { username, _id, role, companyId } = user;
    const payload = {
      sub: _id,
      username,
      role,
      companyId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      userId: _id,
      username,
      companyId,
      role,
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}

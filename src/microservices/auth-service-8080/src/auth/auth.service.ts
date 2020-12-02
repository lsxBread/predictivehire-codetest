import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = {
        id: 1,
        username: 'Leo',
        role: 'admin',
        password: '123123',
      };

      if (password === user.password) {
        const { password, ...rest } = user;
        return rest;
      }

      return null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}

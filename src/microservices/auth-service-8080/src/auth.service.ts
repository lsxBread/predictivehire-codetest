import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

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
        password: '123123',
      };

      if (password === user.password) {
        const { password, ...rest } = user;
        return rest;
      }

      return null;
    } catch (error) {
      this.logger.error(error);
      // throw error;
    }
  }

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
}

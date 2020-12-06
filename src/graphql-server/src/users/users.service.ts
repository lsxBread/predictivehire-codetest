import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Injectable()
export class UsersService {
  async login(username: string, password: string) {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: {
        username,
        password,
      },
    })
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async register(registerUserDto: RegisterUserDto) {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/user',
      data: registerUserDto,
    })
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

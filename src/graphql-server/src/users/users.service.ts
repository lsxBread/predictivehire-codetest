import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsersService {
  async login(username: string, password: string) {
    const result = await axios
      .post('http://localhost:3000/login', {
        username,
        password,
      })
      .then(response => response.data);

    return result;
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { UserRegisterInput } from '../inputs/userRegister.input';
import { UserRegisterSuccessDto } from '../dtos/userRegisterSuccess.dto';
import { UserLoginSuccessDto } from '../dtos/userLoginSuccess.dto';

@Injectable()
export class UsersService {
  async login(username: string, password: string) {
    const result = await axios
      .post<UserLoginSuccessDto>('http://localhost:3000/login', {
        username,
        password,
      })
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async register(userRegisterInput: UserRegisterInput) {
    const result = await axios
      .post<UserRegisterSuccessDto>(
        'http://localhost:3000/user',
        userRegisterInput,
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { UserRegisterInput } from '../inputs/userRegister.input';
import { UserRegisterSuccessDto } from '../dtos/userRegisterSuccess.dto';
import { UserLoginSuccessDto } from '../dtos/userLoginSuccess.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  API_GATEWAY_PORT: number;
  constructor(private readonly configService: ConfigService) {
    this.API_GATEWAY_PORT = this.configService.get('API_GATEWAY_PORT');
  }

  async login(username: string, password: string) {
    const result = await axios
      .post<UserLoginSuccessDto>(
        `http://api-gateway:${this.API_GATEWAY_PORT}/login`,
        {
          username,
          password,
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async register(userRegisterInput: UserRegisterInput) {
    const result = await axios
      .post<UserRegisterSuccessDto>(
        `http://api-gateway:${this.API_GATEWAY_PORT}/user`,
        userRegisterInput,
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

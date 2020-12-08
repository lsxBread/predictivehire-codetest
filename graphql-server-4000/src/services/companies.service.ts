import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CompanyCreateInput } from '../inputs/companyCreate.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompaniesService {
  API_GATEWAY_PORT: number;
  constructor(private readonly configService: ConfigService) {
    this.API_GATEWAY_PORT = this.configService.get('API_GATEWAY_PORT');
  }

  async createCompany(input: CompanyCreateInput) {
    console.log(this.API_GATEWAY_PORT);
    const result = await axios
      .post(`http://api-gateway:${this.API_GATEWAY_PORT}/company`, input)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async findCompanyById(companyId: string) {
    const result = await axios
      .get(`http://api-gateway:${this.API_GATEWAY_PORT}/company/${companyId}`)
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

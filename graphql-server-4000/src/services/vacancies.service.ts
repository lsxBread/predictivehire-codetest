import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { VacancyCreateInput } from '../inputs/vacancyCreate.input';
import { VacancyUpdateInput } from '../inputs/vacancyUpdate.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VacanciesService {
  API_GATEWAY_PORT: number;
  constructor(private readonly configService: ConfigService) {
    this.API_GATEWAY_PORT = this.configService.get('API_GATEWAY_PORT');
  }

  async findVacancyById(
    vacancyId: string,
    companyId: string,
    authorization: string,
  ) {
    const result = await axios
      .get(
        `http://api-gateway:${this.API_GATEWAY_PORT}/vacancy/${vacancyId}?company_id=${companyId}`,
        {
          headers: {
            authorization,
          },
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async findAllVacanciesByCompanyId(companyId: string, authorization: string) {
    const result = await axios
      .get(
        `http://api-gateway:${this.API_GATEWAY_PORT}/vacancy?company_id=${companyId}`,
        {
          headers: {
            authorization,
          },
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async createVacancy(input: VacancyCreateInput, authorization: string) {
    const { companyId, ...rest } = input;

    const result = await axios
      .post(
        `http://api-gateway:${this.API_GATEWAY_PORT}/vacancy?company_id=${companyId}`,
        rest,
        {
          headers: {
            authorization,
          },
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async updateVacancyById(
    vacancyId: string,
    companyId: string,
    input: VacancyUpdateInput,
    authorization: string,
  ) {
    const result = await axios
      .put(
        `http://api-gateway:${this.API_GATEWAY_PORT}/vacancy/${vacancyId}?company_id=${companyId}`,
        input,
        {
          headers: {
            authorization,
          },
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async deleteVacancyById(
    vacancyId: string,
    companyId: string,
    authorization: string,
  ) {
    const result = await axios
      .delete(
        `http://api-gateway:${this.API_GATEWAY_PORT}/vacancy/${vacancyId}?company_id=${companyId}`,
        {
          headers: {
            authorization,
          },
        },
      )
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

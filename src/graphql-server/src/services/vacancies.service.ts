import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { VacancyCreateInput } from '../inputs/VacancyCreate.input';
import { VacancyUpdateInput } from '../inputs/VacancyUpdate.input';

@Injectable()
export class VacanciesService {
  async findVacancyById(
    vacancyId: string,
    companyId: string,
    authorization: string,
  ) {
    const result = await axios
      .get(
        `http://localhost:3000/vacancy/${vacancyId}?company_id=${companyId}`,
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
      .get(`http://localhost:3000/vacancy?company_id=${companyId}`, {
        headers: {
          authorization,
        },
      })
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async createVacancy(input: VacancyCreateInput, authorization: string) {
    const { companyId, ...rest } = input;

    const result = await axios
      .post(`http://localhost:3000/vacancy?company_id=${companyId}`, rest, {
        headers: {
          authorization,
        },
      })
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
        `http://localhost:3000/vacancy/${vacancyId}?company_id=${companyId}`,
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
        `http://localhost:3000/vacancy/${vacancyId}?company_id=${companyId}`,
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

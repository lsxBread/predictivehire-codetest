import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CompanyCreateInput } from '../inputs/companyCreate.input';

@Injectable()
export class CompaniesService {
  async createCompany(input: CompanyCreateInput) {
    const result = await axios
      .post(`http://localhost:3000/company`, input)
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }

  async findCompanyById(companyId: string) {
    const result = await axios
      .get(`http://localhost:3000/company/${companyId}`)
      .then(response => response.data)
      .catch(error => {
        throw new Error(JSON.stringify(error.response.data));
      });

    return result;
  }
}

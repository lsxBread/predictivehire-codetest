import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CompaniesService {
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

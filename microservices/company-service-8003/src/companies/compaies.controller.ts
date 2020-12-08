import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { CompaniesService } from './companies.service';

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern({ role: 'company', cmd: 'create' })
  createCompany(createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @MessagePattern({ role: 'company', cmd: 'findById' })
  async findById(companyId: string) {
    return this.companiesService.findById(companyId);
  }
}

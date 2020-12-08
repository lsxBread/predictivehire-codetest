import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DtoValidationPipe } from '../pipes/dtoValidation.pipe';
import { RegisterCompanyDto } from '../dtos/company/registerCompany.dto';
import { CompanyResponseDto } from '../dtos/company/companyResponse.dto';
import { NotFoundInterceptor } from '../interceptors/NotFoundInterceptor';
import { MongodbIdFormatGuard } from '../guards/mongodbIdFormat.guard';

@Controller()
export class CompanyController {
  constructor(
    @Inject('COMPANY_SERVICE') private readonly companyService: ClientProxy,
  ) {}

  @Post('/company')
  registerCompany(
    @Body(new DtoValidationPipe()) registerCompanyDto: RegisterCompanyDto,
  ): Promise<CompanyResponseDto> {
    return this.companyService
      .send({ role: 'company', cmd: 'create' }, registerCompanyDto)
      .toPromise();
  }

  @Get('/company/:id')
  @UseInterceptors(new NotFoundInterceptor('Company not found'))
  @UseGuards(new MongodbIdFormatGuard('Company id format is wrong', 'id'))
  getCompanyById(@Param('id') companyId: string): Promise<CompanyResponseDto> {
    return this.companyService
      .send({ role: 'company', cmd: 'findById' }, companyId)
      .toPromise();
  }
}

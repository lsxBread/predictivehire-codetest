import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompanyIdGuard } from '../guards/companyId.guard';
import { NotFoundInterceptor } from '../interceptors/NotFoundInterceptor';
import { DtoValidationPipe } from '../pipes/dtoValidation.pipe';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { VacancyResponseDto } from '../dtos/vacancy/vacancyResponse.dto';
import { CreateVacancyDto } from '../dtos/vacancy/createVacancy.dto';
import { UpdateVacancyDto } from '../dtos/vacancy/updateVacancy.dto';
import { MongodbIdFormatGuard } from '../guards/mongodbIdFormat.guard';

@Controller()
export class VacancyController {
  constructor(
    @Inject('VACANCY_SERVICE') private readonly vacancyService: ClientProxy,
  ) {}

  @Get('/vacancy/:id')
  @UseGuards(AuthGuard)
  @UseGuards(new MongodbIdFormatGuard('Vacancy id format is wrong', 'id'))
  @UseGuards(CompanyIdGuard)
  @UseInterceptors(new NotFoundInterceptor('Vacancy not found'))
  getVacancy(
    @Param('id')
    vacancyId: string,
    @Query('company_id')
    companyId: string,
  ): Promise<VacancyResponseDto> {
    return this.vacancyService
      .send(
        { role: 'vacancy', cmd: 'findVacancyById' },
        {
          vacancyId,
          companyId,
        },
      )
      .toPromise();
  }

  @Get('/vacancy')
  @UseGuards(AuthGuard)
  @UseGuards(CompanyIdGuard)
  @UseInterceptors(new NotFoundInterceptor('No vacanies in target company'))
  getVacanciesOfCompany(
    @Query('company_id') companyId: string,
  ): Promise<VacancyResponseDto[]> {
    return this.vacancyService
      .send({ role: 'vacancy', cmd: 'findVacancyByCompanyId' }, companyId)
      .toPromise();
  }

  @Post('/vacancy')
  @UseGuards(AuthGuard)
  @UseGuards(CompanyIdGuard)
  createVacancy(
    @Body(new DtoValidationPipe()) createVacancyDto: CreateVacancyDto,
    @Query('company_id') companyId: string,
  ): Promise<VacancyResponseDto> {
    return this.vacancyService
      .send(
        { role: 'vacancy', cmd: 'create' },
        {
          companyId,
          ...createVacancyDto,
        },
      )
      .toPromise();
  }

  @Put('/vacancy/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @UseGuards(new MongodbIdFormatGuard('Vacancy id format is wrong', 'id'))
  @UseGuards(CompanyIdGuard)
  @UseInterceptors(new NotFoundInterceptor('Vacancy not found during update'))
  updateVacancy(
    @Param('id') vacancyId: string,
    @Query('company_id') companyId: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<VacancyResponseDto> {
    return this.vacancyService
      .send(
        { role: 'vacancy', cmd: 'updateVacancyById' },
        {
          ...updateVacancyDto,
          vacancyId,
          companyId,
        },
      )
      .toPromise();
  }

  @Delete('/vacancy/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @UseGuards(new MongodbIdFormatGuard('Vacancy id format is wrong', 'id'))
  @UseGuards(CompanyIdGuard)
  @UseInterceptors(new NotFoundInterceptor('Vacancy not found during delete'))
  deleteVacancy(
    @Param('id') vacancyId: string,
    @Query('company_id') companyId: string,
  ): Promise<VacancyResponseDto> {
    return this.vacancyService
      .send(
        { role: 'vacancy', cmd: 'deleteVacancyById' },
        {
          vacancyId,
          companyId,
        },
      )
      .toPromise();
  }
}

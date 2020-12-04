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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller()
export class VacancyController {
  constructor(
    @Inject('VACANCY_SERVICE') private readonly vacancyService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/vacancy/:id')
  getVacancy(@Param('id') vacandyId: string) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'findVacancyById' },
      vacandyId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/vacancy')
  getVacancisOfCompany(@Query('company_id') companyId: string) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'findVacancyByCompanyId' },
      companyId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/vacancy')
  getVacancies() {
    return this.vacancyService.send(
      {
        role: 'vacancy',
        cmd: 'findAllVacancies',
      },
      {},
    );
  }

  @UseGuards(AuthGuard)
  @Post('/vacancy')
  createVacancy(@Body() createVacancyDto: any) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'create' },
      createVacancyDto,
    );
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Put('/vacancy/:id')
  updateVacancy(@Param('id') id: string, @Body() updateVacancyDto: any) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'udpateVacancyById' },
      {
        id,
        updateVacancyDto,
      },
    );
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete('/vacancy/:id')
  deleteVacancy(@Param('id') vacandyId: string) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'deleteVacancyById' },
      vacandyId,
    );
  }
}

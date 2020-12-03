import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('VACANCY_SERVICE') private readonly vacancyService: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Post('/user')
  registerUser(@Body() createUserDto: any) {
    return this.userService.send(
      { role: 'user', cmd: 'create' },
      createUserDto,
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
  getVacancies() {
    return this.vacancyService.send(
      {
        role: 'vacancy',
        cmd: 'findAllVacancies',
      },
      {},
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

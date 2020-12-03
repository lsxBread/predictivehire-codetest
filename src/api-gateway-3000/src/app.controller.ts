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
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('VACANCY_SERVICE') private readonly vacancyService: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user/:name')
  getUserByName(@Param('name') name: string) {
    return this.userService.send({ cmd: 'hello' }, name);
  }

  @Post('/user')
  registerUser(@Body() createUserDto: any) {
    return this.userService.send(
      { role: 'user', cmd: 'create' },
      createUserDto,
    );
  }

  @Post('/vacancy')
  createVacancy(@Body() createVacancyDto: any) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'create' },
      createVacancyDto,
    );
  }

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

  @Get('/vacancy/:id')
  getVacancy(@Param('id') vacandyId: string) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'findVacancyById' },
      vacandyId,
    );
  }

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

  @Delete('/vacancy/:id')
  deleteVacancy(@Param('id') vacandyId: string) {
    return this.vacancyService.send(
      { role: 'vacancy', cmd: 'deleteVacancyById' },
      vacandyId,
    );
  }
}

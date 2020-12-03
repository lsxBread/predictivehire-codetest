import {
  Controller,
  Get,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVacancyDto } from './dtos/create-vacancy.dto';
import { VacanciesService } from './vacancies.service';

@Controller()
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @MessagePattern({ role: 'vacancy', cmd: 'create' })
  createNewVacancy(createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'findAllVacancies' })
  async findAllVacancies() {
    return this.vacanciesService.findAllVacancies();
  }

  @MessagePattern({ role: 'vacancy', cmd: 'findVacancyById' })
  async findVacancyById(id: string) {
    return this.vacanciesService.findVacancyById(id);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'udpateVacancyById' })
  async updateVacancyById(payload) {
    return this.vacanciesService.updateVacancyById(payload);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'deleteVacancyById' })
  async deleteVacancyId(id: string) {
    return this.vacanciesService.deleteVacancyId(id);
  }
}

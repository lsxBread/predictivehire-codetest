import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVacancyDto } from './dtos/createVacancy.dto';
import { DeleteVacancyDto } from './dtos/deleteVacancy.dto';
import { GetVacancyDto } from './dtos/getVacancy.dto';
import { UpdateVacancyDto } from './dtos/updateVacancy.dto';
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
  async findVacancyById(getVacancyDto: GetVacancyDto) {
    const { vacancyId, companyId } = getVacancyDto;
    return this.vacanciesService.findVacancyById(vacancyId, companyId);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'findVacancyByCompanyId' })
  async findVacancyByCompanyId(id: string) {
    return this.vacanciesService.findVacancyByCompanyId(id);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'updateVacancyById' })
  async updateVacancyById(updateVacancyDto: UpdateVacancyDto) {
    const { vacancyId, companyId, ...rest } = updateVacancyDto;
    return this.vacanciesService.updateVacancyById(vacancyId, companyId, rest);
  }

  @MessagePattern({ role: 'vacancy', cmd: 'deleteVacancyById' })
  async deleteVacancyId(deteleVacancyDto: DeleteVacancyDto) {
    const { vacancyId, companyId } = deteleVacancyDto;
    return this.vacanciesService.deleteVacancyId(vacancyId, companyId);
  }
}

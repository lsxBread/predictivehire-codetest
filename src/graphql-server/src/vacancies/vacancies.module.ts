import { Module } from '@nestjs/common';
import { VacanciesResolver } from './vacancies.resolver';
import { VacanciesService } from './vacancies.service';

@Module({
  providers: [VacanciesResolver, VacanciesService],
})
export class VacanciesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule {}

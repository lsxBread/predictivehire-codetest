import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), VacanciesModule],
})
export class AppModule {}

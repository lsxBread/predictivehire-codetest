import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), CompaniesModule],
})
export class AppModule {}

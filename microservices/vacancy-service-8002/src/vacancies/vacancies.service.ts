import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy.name)
    private readonly vacancyModel: Model<VacancyDocument>,
  ) {}

  async create(createVacancyDto: any): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel(createVacancyDto);
    return createdVacancy.save();
  }

  async findVacancyById(
    vacancyId: string,
    companyId: string,
  ): Promise<Vacancy> {
    return this.vacancyModel.findOne({ _id: vacancyId, companyId }).exec();
  }

  async findVacancyByCompanyId(id: string): Promise<Vacancy[]> {
    return this.vacancyModel.find({ companyId: id }).exec();
  }

  async deleteVacancyId(
    vacancyId: string,
    companyId: string,
  ): Promise<Vacancy> {
    return this.vacancyModel
      .findOneAndDelete({ _id: vacancyId, companyId })
      .exec();
  }

  async findAllVacancies(): Promise<Vacancy[]> {
    return this.vacancyModel.find().exec();
  }

  async updateVacancyById(
    vacancyId: string,
    companyId: string,
    payload: any,
  ): Promise<Vacancy> {
    return this.vacancyModel
      .findOneAndUpdate(
        { _id: vacancyId, companyId },
        { $set: { ...payload } },
        { new: true },
      )
      .exec();
  }
}

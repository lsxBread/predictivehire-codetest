import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dtos/create-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy.name)
    private readonly vacancyModel: Model<VacancyDocument>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel(createVacancyDto);
    return createdVacancy.save();
  }

  async findVacancyById(id: string): Promise<Vacancy> {
    try {
      const foundVacancy = this.vacancyModel.findById(id).exec();

      if (!foundVacancy) {
        throw new NotFoundException('Vacancy not found.');
      }

      return foundVacancy;
    } catch (e) {
      throw new NotFoundException('Vacancy not found.');
    }
  }

  async deleteVacancyId(id: string): Promise<Vacancy> {
    return this.vacancyModel.findByIdAndDelete(id).exec();
  }

  async findAllVacancies(): Promise<Vacancy[]> {
    return this.vacancyModel.find().exec();
  }

  async updateVacancyById(payload): Promise<Vacancy> {
    const { id, updateVacancyDto } = payload;
    return this.vacancyModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { ...updateVacancyDto } },
        { new: true },
      )
      .exec();
  }
}

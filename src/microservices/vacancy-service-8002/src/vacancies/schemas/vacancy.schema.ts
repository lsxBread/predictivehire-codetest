import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type VacancyDocument = Vacancy & mongoose.Document;

@Schema()
export class Vacancy {
  @Prop()
  companyId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  expireAt: mongoose.Schema.Types.Date;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);

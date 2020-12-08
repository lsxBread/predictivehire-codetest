import { IsString, IsDateString } from 'class-validator';

export class UpdateVacancyDto {
  @IsString()
  title: string;

  @IsString()
  description: number;

  @IsDateString()
  expireAt: string;
}

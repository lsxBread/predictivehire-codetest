import { IsString, IsDateString } from 'class-validator';
export class CreateVacancyDto {
  @IsString()
  companyId: string;

  @IsString()
  title: string;

  @IsString()
  description: number;

  @IsDateString()
  expireAt: string;
}

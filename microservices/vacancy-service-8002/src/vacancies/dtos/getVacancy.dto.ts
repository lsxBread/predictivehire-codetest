import { IsString } from 'class-validator';
export class GetVacancyDto {
  @IsString()
  vacancyId: string;

  @IsString()
  companyId: string;
}

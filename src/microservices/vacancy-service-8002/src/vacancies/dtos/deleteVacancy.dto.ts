import { IsString } from 'class-validator';
export class DeleteVacancyDto {
  @IsString()
  vacancyId: string;

  @IsString()
  companyId: string;
}

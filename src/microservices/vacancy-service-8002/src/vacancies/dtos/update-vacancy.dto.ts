export class UpdateVacancyDto {
  readonly companyId: string;
  readonly vacancyId: string;
  readonly title: string;
  readonly description: string;
  readonly expireAt: string;
}

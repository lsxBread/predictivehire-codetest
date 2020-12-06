import {
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { CompaniesService } from '../services/companies.service';
import { Company } from '../models/company.model';
import { Vacancy } from '../models/vacancy.model';
import { VacanciesService } from '../services/vacancies.service';

@Resolver(of => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly vacanciesService: VacanciesService,
  ) {}

  @Query(() => Company)
  async company(@Args('id', { type: () => String }) companyId: string) {
    return this.companiesService.findCompanyById(companyId);
  }

  @ResolveField(() => [Vacancy])
  async vacancies(
    @Parent() company: Company,
    @Context('authorization') authorization: string,
  ) {
    const { _id } = company;
    return this.vacanciesService.findAllVacanciesByCompanyId(
      _id,
      authorization,
    );
  }
}

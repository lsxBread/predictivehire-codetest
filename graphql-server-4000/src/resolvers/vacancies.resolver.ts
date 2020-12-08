import {
  Query,
  Resolver,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VacanciesService } from '../services/vacancies.service';
import { VacancyCreateSuccessDto } from '../dtos/vacancyCreateSuccess.dto';
import { VacancyCreateInput } from '../inputs/vacancyCreate.input';
import { Vacancy } from '../models/vacancy.model';
import { Company } from '../models/company.model';
import { CompaniesService } from '../services/companies.service';
import { VacancyUpdateInput } from '../inputs/vacancyUpdate.input';

@Resolver(of => Vacancy)
export class VacanciesResolver {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Query(() => Vacancy)
  async vacancy(
    @Args('vacancyId', { type: () => String }) vacancyId: string,
    @Args('companyId', { type: () => String }) companyId: string,
    @Context('authorization') authorization: string,
  ) {
    return this.vacanciesService.findVacancyById(
      vacancyId,
      companyId,
      authorization,
    );
  }

  @Mutation(() => VacancyCreateSuccessDto)
  async createVacancy(
    @Args('input') input: VacancyCreateInput,
    @Context('authorization') authorization: string,
  ) {
    return this.vacanciesService.createVacancy(input, authorization);
  }

  @Mutation(() => Vacancy)
  async deleteVacancy(
    @Args('vacancyId', { type: () => String }) vacancyId: string,
    @Args('companyId', { type: () => String }) companyId: string,
    @Context('authorization') authorization: string,
  ) {
    return this.vacanciesService.deleteVacancyById(
      vacancyId,
      companyId,
      authorization,
    );
  }

  @Mutation(() => Vacancy)
  async updateVacancy(
    @Args('vacancyId', { type: () => String }) vacancyId: string,
    @Args('companyId', { type: () => String }) companyId: string,
    @Args('input') input: VacancyUpdateInput,
    @Context('authorization') authorization: string,
  ) {
    return this.vacanciesService.updateVacancyById(
      vacancyId,
      companyId,
      input,
      authorization,
    );
  }

  @ResolveField(() => Company)
  async company(@Parent() vacancy: Vacancy) {
    const companyId = vacancy['companyId'];
    return this.companiesService.findCompanyById(companyId);
  }
}

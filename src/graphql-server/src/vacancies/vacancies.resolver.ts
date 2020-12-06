import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { VacanciesService } from './vacancies.service';

@Resolver()
export class VacanciesResolver {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World from vacancies!';
  }
  
  @Mutation(() => )
  async createVacancy() {
    
  }
}

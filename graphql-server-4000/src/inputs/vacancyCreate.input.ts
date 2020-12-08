import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VacancyCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  expireAt: string;

  @Field(() => String)
  companyId: string;
}

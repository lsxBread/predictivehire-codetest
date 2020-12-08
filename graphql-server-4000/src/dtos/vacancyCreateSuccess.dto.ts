import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VacancyCreateSuccessDto {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  expireAt: string;
}

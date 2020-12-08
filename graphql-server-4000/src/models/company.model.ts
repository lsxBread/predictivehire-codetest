import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vacancy } from './vacancy.model';
import { User } from './user.model';

@ObjectType()
export class Company {
  @Field(type => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => [Vacancy])
  vacancies: Vacancy[];

  @Field(() => [User])
  users: User[];
}

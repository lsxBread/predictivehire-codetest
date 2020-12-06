import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Company } from './company.model';

@ObjectType()
export class User {
  @Field(() => String)
  _id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => Company)
  company: Company;
}

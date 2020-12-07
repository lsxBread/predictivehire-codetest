import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CompanyCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;
}

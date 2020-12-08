import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;

  @Field(() => ID)
  companyId: string;
}

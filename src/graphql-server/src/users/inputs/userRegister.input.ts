import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly username: string;

  @Field(() => String)
  readonly password: string;

  @Field(() => String)
  readonly role: string;

  @Field(() => ID)
  readonly companyId: string;
}

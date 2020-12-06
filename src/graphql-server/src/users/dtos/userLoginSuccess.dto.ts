import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserLoginSuccessDto {
  @Field(() => String)
  readonly username: string;

  @Field(() => ID)
  readonly userId: string;

  @Field(() => ID)
  readonly companyId: string;

  @Field(() => String)
  readonly role: string;

  @Field(() => String)
  readonly accessToken: string;
}

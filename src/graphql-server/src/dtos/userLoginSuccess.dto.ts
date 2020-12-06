import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserLoginSuccessDto {
  @Field(() => String)
  username: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  companyId: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  accessToken: string;
}

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserRegisterSuccessDto {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  companyId: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class RegisterUserDto {
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

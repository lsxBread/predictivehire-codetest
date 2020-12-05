import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLoginDto } from './dtos/userLogin.dto';
import { UsersService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserLoginDto)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.userService.login(username, password);
  }
}

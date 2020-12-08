import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { UserRegisterInput } from '../inputs/userRegister.input';
import { UserLoginSuccessDto } from '../dtos/userLoginSuccess.dto';
import { User } from '../models/user.model';
import { UserRegisterSuccessDto } from '../dtos/userRegisterSuccess.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserLoginSuccessDto)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.userService.login(username, password);
  }

  @Mutation(returns => UserRegisterSuccessDto)
  async register(@Args('input') input: UserRegisterInput) {
    return this.userService.register(input);
  }
}

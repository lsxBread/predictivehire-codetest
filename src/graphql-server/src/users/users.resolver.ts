import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { UserRegisterInput } from './inputs/userRegister.input';
import { UserLoginSuccessDto } from './dtos/userLoginSuccess.dto';

@Resolver()
export class UserResolver {
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

  @Mutation(() => RegisterUserDto)
  async register(@Args('input') input: UserRegisterInput) {
    return this.userService.register(input);
  }
}

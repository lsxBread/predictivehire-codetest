import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from '../services/users.service';
import { UserRegisterInput } from '../inputs/userRegister.input';

describe('User Resolver', () => {
  let resolver: UsersResolver;

  const mockLoginSuccess = {
    accessToken: 'accessToken',
  };

  const mockRegisterSuccess = {
    name: 'mockedName',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useFactory: () => ({
            login: jest.fn(
              (username: string, password: string) => mockLoginSuccess,
            ),
            register: jest.fn(
              (input: UserRegisterInput) => mockRegisterSuccess,
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return token', async () => {
      expect(await resolver.login('username', 'password')).toEqual(
        mockLoginSuccess,
      );
    });
  });

  describe('register', () => {
    it('should return user info', async () => {
      expect(await resolver.register({} as UserRegisterInput)).toEqual(
        mockRegisterSuccess,
      );
    });
  });
});

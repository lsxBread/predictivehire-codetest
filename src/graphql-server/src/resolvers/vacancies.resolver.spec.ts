import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesResolver } from './vacancies.resolver';
import { VacanciesService } from '../services/vacancies.service';
import { CompaniesService } from '../services/companies.service';
import { UserRegisterInput } from '../inputs/userRegister.input';

describe('Vacancies Resolver', () => {
  let resolver: VacanciesResolver;

  const mockLoginSuccess = {
    accessToken: 'accessToken',
  };

  const mockRegisterSuccess = {
    name: 'mockedName',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesResolver,
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

    resolver = module.get<UserResolver>(UserResolver);
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

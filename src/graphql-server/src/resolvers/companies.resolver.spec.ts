import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from '../services/companies.service';
import { VacanciesService } from '../services/vacancies.service';
import { Company } from '../models/company.model';

describe('Companies Resolver', () => {
  let resolver: CompaniesResolver;

  const mockCompany = {
    name: 'mockName',
    address: 'mockAddress',
  };

  const mockVacancy = {
    title: 'mockTitle',
    description: 'mockDescription',
    expireAt: 'mockExpireAt',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesResolver,
        {
          provide: CompaniesService,
          useFactory: () => ({
            findCompanyById: jest.fn((id: string) => mockCompany),
          }),
        },
        {
          provide: VacanciesService,
          useFactory: () => ({
            findAllVacanciesByCompanyId: jest.fn(
              (company: Company, token: string) => [mockVacancy],
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CompaniesResolver>(CompaniesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCompany', () => {
    it('should get the company', async () => {
      expect(await resolver.company('123')).toEqual(mockCompany);
    });
  });

  describe('getVacanciesByCompanyId', () => {
    it('should get vacancies array', async () => {
      expect(await resolver.vacancies({} as Company, 'token')).toEqual([
        mockVacancy,
      ]);
    });
  });
});

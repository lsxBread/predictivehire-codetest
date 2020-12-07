import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesResolver } from './vacancies.resolver';
import { VacanciesService } from '../services/vacancies.service';
import { CompaniesService } from '../services/companies.service';
import { VacancyCreateInput } from '../inputs/vacancyCreate.input';

describe('Vacancies Resolver', () => {
  let resolver: VacanciesResolver;

  const mockVacancy = {
    title: 'mockTitle',
    description: 'mockDescription',
    expireAt: 'mockExpireAt',
  };

  const mockCompany = {
    name: 'mockName',
    address: 'mockAddress',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesResolver,
        {
          provide: VacanciesService,
          useFactory: () => ({
            findVacancyById: jest.fn(
              (vacancyId: string, companyId: string, auth: string) =>
                mockVacancy,
            ),
            createVacancy: jest.fn(
              (input: VacancyCreateInput, auth: string) => mockVacancy,
            ),
            deleteVacancyById: jest.fn(
              (vacancyId: string, companyId: string, auth: string) =>
                mockVacancy,
            ),
            updateVacancyById: jest.fn(
              (
                vacancyId: string,
                companyId: string,
                input: VacancyCreateInput,
                auth: string,
              ) => mockVacancy,
            ),
          }),
        },
        {
          provide: CompaniesService,
          useFactory: () => ({
            findCompanyById: jest.fn((companyId: string) => mockCompany),
          }),
        },
      ],
    }).compile();

    resolver = module.get<VacanciesResolver>(VacanciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getVacancy', () => {
    it('should return single vacancy', async () => {
      expect(
        await resolver.vacancy(
          expect.anything(),
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(mockVacancy);
    });
  });

  describe('createVacancy', () => {
    it('should return created vacancy', async () => {
      expect(
        await resolver.createVacancy(expect.anything(), expect.anything()),
      ).toEqual(mockVacancy);
    });
  });

  describe('deleteVacancy', () => {
    it('should return deleted vacancy', async () => {
      expect(
        await resolver.deleteVacancy(
          expect.anything(),
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(mockVacancy);
    });
  });

  describe('updateVacancy', () => {
    it('should return updated vacancy', async () => {
      expect(
        await resolver.updateVacancy(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(mockVacancy);
    });
  });

  describe('updateVacancy', () => {
    it('should return updated vacancy', async () => {
      expect(
        await resolver.updateVacancy(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(mockVacancy);
    });
  });

  describe('get company of vacancy', () => {
    it('should return single company', async () => {
      expect(await resolver.company(expect.anything())).toEqual(mockCompany);
    });
  });
});

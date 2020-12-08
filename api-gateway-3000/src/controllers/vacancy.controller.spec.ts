import { Test } from '@nestjs/testing';
import { VacancyController } from './vacancy.controller';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { of } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';

describe('API Gateway - VacancyController', () => {
  let vacancyController: VacancyController;
  let vacancyService: ClientProxy;
  const mockAuthGuard = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VacancyController],
      providers: [
        {
          provide: 'VACANCY_SERVICE',
          useFactory: () => {
            return ClientProxyFactory.create({});
          },
        },
        {
          provide: 'AUTH_SERVICE',
          useFactory: () => {
            return ClientProxyFactory.create({});
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    vacancyService = moduleRef.get<ClientProxy>('VACANCY_SERVICE');
    vacancyController = moduleRef.get<VacancyController>(VacancyController);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getVacancy', () => {
    it('should return single Vacancy', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(vacancyService, 'send').mockImplementation(() => of(result));

      expect(
        await vacancyController.getVacancy(
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(result);
    });
  });

  describe('getVacanciesByCompanyId', () => {
    it('should return vacancies array', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(vacancyService, 'send').mockImplementation(() => of([result]));

      expect(
        await vacancyController.getVacanciesOfCompany(expect.anything()),
      ).toEqual([result]);
    });
  });

  describe('createVacancy', () => {
    it('should return created vacancy', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(vacancyService, 'send').mockImplementation(() => of(result));

      expect(
        await vacancyController.createVacancy(
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(result);
    });
  });

  describe('updateVacancy', () => {
    it('should return updated vacancy', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(vacancyService, 'send').mockImplementation(() => of(result));

      expect(
        await vacancyController.updateVacancy(
          expect.anything(),
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(result);
    });
  });

  describe('deleteVacancy', () => {
    it('should return deleted vacancy', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(vacancyService, 'send').mockImplementation(() => of(result));

      expect(
        await vacancyController.deleteVacancy(
          expect.anything(),
          expect.anything(),
        ),
      ).toEqual(result);
    });
  });
});

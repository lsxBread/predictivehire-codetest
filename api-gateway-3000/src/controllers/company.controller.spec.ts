import { Test } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('API Gateway - CompanyController', () => {
  let companyController: CompanyController;
  let companyService: ClientProxy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: 'COMPANY_SERVICE',
          useFactory: () => {
            return ClientProxyFactory.create({});
          },
        },
      ],
    }).compile();

    companyService = moduleRef.get<ClientProxy>('COMPANY_SERVICE');
    companyController = moduleRef.get<CompanyController>(CompanyController);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('registerCompany', () => {
    it('should return registered company', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(companyService, 'send').mockImplementation(() => of(result));

      expect(
        await companyController.registerCompany(expect.anything()),
      ).toEqual(result);
    });

    it('should return single company', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(companyService, 'send').mockImplementation(() => of(result));

      expect(await companyController.getCompanyById(expect.anything())).toEqual(
        result,
      );
    });
  });
});

import { Test } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import axios from 'axios';
import { ConfigModule } from '@nestjs/config';

describe('Graphql - CompanyService', () => {
  let companyService: CompaniesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [CompaniesService],
    }).compile();

    companyService = moduleRef.get<CompaniesService>(CompaniesService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('findCompanyById', () => {
    it('should return company when success', async () => {
      const mockCompany = { name: 'mockedName' };
      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockCompany });

      expect(await companyService.findCompanyById(expect.anything())).toEqual(
        mockCompany,
      );
    });

    it('should throw error when fails', async () => {
      jest
        .spyOn(axios, 'get')
        .mockRejectedValue({ response: { data: 'Failed' } });

      await expect(
        companyService.findCompanyById(expect.anything()),
      ).rejects.toThrowError('Failed');
    });
  });
});

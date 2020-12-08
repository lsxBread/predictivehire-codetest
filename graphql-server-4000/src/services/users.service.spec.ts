import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import axios from 'axios';
import { ConfigModule } from '@nestjs/config';

describe('Graphql - UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('login', () => {
    it('should return token when success', async () => {
      const mockReponse = { token: 'mockedToken' };
      jest.spyOn(axios, 'post').mockResolvedValue({ data: mockReponse });

      expect(
        await usersService.login(expect.anything(), expect.anything()),
      ).toEqual(mockReponse);
    });

    it('should throw error when fails', async () => {
      jest
        .spyOn(axios, 'post')
        .mockRejectedValue({ response: { data: 'Failed' } });

      await expect(
        usersService.login(expect.anything(), expect.anything()),
      ).rejects.toThrowError('Failed');
    });
  });

  describe('register', () => {
    it('should return registered user when success', async () => {
      const mockReponse = { name: 'mockName' };
      jest.spyOn(axios, 'post').mockResolvedValue({ data: mockReponse });

      expect(await usersService.register(expect.anything())).toEqual(
        mockReponse,
      );
    });

    it('should throw error when fails', async () => {
      jest
        .spyOn(axios, 'post')
        .mockRejectedValue({ response: { data: 'Failed' } });

      await expect(
        usersService.register(expect.anything()),
      ).rejects.toThrowError('Failed');
    });
  });
});

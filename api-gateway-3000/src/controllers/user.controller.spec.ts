import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { of } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

describe('API Gateway - UserController', () => {
  let userController: UserController;
  let userService: ClientProxy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useFactory: () => {
            return ClientProxyFactory.create({});
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<ClientProxy>('USER_SERVICE');
    userController = moduleRef.get<UserController>(UserController);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('registerUser', () => {
    it('should return registered User', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(userService, 'send').mockImplementation(() => of(result));

      expect(await userController.registerUser(expect.anything())).toEqual(
        result,
      );
    });
  });
});

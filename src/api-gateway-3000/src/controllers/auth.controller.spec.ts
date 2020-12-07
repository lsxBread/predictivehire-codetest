import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('API Gateway - AuthController', () => {
  let authController: AuthController;
  let authService: ClientProxy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useFactory: () => {
            return ClientProxyFactory.create({});
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<ClientProxy>('AUTH_SERVICE');
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('registerUser', () => {
    it('should return registered user', async () => {
      const result = {
        name: 'mockName',
      };
      jest.spyOn(authService, 'send').mockImplementation(() => of(result));

      expect(await authController.registerUser(expect.anything())).toEqual(
        result,
      );
    });
  });
});

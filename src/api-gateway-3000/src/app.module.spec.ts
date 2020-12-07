import { AppModule } from './app.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', async () => {
    expect(module.get('USER_SERVICE')).toBeDefined();
    expect(module.get('AUTH_SERVICE')).toBeDefined();
    expect(module.get('COMPANY_SERVICE')).toBeDefined();
    expect(module.get('VACANCY_SERVICE')).toBeDefined();
  });
});

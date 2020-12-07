import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should be defined', async done => {
    const app = await NestFactory.createApplicationContext(AppModule);
    expect(app).toBeDefined();
    expect(app.get('USER_SERVICE')).toBeDefined();
    expect(app.get('AUTH_SERVICE')).toBeDefined();
    expect(app.get('COMPANY_SERVICE')).toBeDefined();
    expect(app.get('VACANCY_SERVICE')).toBeDefined();
    done();
  });
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLModule } from '@nestjs/graphql';

describe('AppModule', () => {
  it('should be defined', async done => {
    const app = await NestFactory.createApplicationContext(AppModule);
    expect(app).toBeDefined();
    expect(app.get(GraphQLModule)).toBeDefined();
    done();
  });
});

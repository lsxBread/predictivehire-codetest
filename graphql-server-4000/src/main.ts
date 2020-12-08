import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    Logger.log(`Graphql server is listening on ${port}`, 'GRAPHQL_SERVER');
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Vacancy Service');

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8002;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  });

  await app.listen(() => {
    logger.log(`Vacancy service is listening on port: ${port}`);
  });
}
bootstrap();

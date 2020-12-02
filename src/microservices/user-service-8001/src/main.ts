import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('User Service');

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8001;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  });

  await app.listen(() => {
    logger.log(`User service is listening on port: ${port}`);
  });
}
bootstrap();

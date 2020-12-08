import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Auth Service');

async function bootstrap() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: PORT,
    },
  });

  await app.listen(() => {
    logger.log(`Auth service is listening on port: ${PORT}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Auth Service');

async function bootstrap() {
  const HTTP_PORT = process.env.PORT ? Number(process.env.HTTP_PORT) : 3001;
  const TCP_PORT = process.env.PORT ? Number(process.env.TCP_PORT) : 8080;

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: TCP_PORT,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT, () => {
    logger.log(`Auth service is listening on port: ${HTTP_PORT}`);
  });
}
bootstrap();

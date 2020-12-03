import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'Logger',
      useFactory: () => {
        return new Logger('Auth-Service');
      },
    },
  ],
})
export class AppModule {}

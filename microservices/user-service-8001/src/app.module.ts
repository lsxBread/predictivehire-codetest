import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), UsersModule],
})
export class AppModule {}

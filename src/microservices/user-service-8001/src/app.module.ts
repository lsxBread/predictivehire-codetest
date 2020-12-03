import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';

console.log(process.env.DB_URL);
@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), UsersModule],
})
export class AppModule {}

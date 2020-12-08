import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import Services from './services';
import Resolvers from './resolvers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({
        authorization: req.headers.authorization || '',
      }),
    }),
  ],
  providers: [...Services, ...Resolvers],
})
export class AppModule {}

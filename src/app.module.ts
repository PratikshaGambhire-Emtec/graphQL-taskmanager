/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';
import { TaskModule } from './tasks/task.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TaskModule,
    UserModule,

    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeORMConfiguration),
  
    // adding dependecy for graphQL
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

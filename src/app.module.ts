import { Module } from '@nestjs/common';
import { SportsGameModule } from './modules/sports-game/sports-game.module';
import { dataSourceOptions } from '../db/data-source'
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    SportsGameModule, TypeOrmModule.forRoot(dataSourceOptions)]
})
export class AppModule { }

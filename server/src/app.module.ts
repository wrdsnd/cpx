import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { AnalyzerModule } from './analyzer/analyzer.module'
import { AppController } from './app.controller'
import { FeedModule } from './feed/feed.module'
import { QueueModule } from './queue/queue.module'
import { PublisherModule } from './publisher/publisher.module'
import { TwitterModule } from './twitter/twitter.module'
import { DraftsModule } from './drafts/drafts.module'
import { AuthModule } from './auth/auth.module'
import { ApolloDriver } from '@nestjs/apollo'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        defaultScalarType: 'unknown',
        customScalarTypeMapping: {
          ISO8601Date: 'Date',
          ISO8601DateTime: 'Date',
          ISO8601Time: 'Date',
        },
      },
      typePaths: [join(process.cwd(), 'src/schema.graphql')],
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: (process.env.TYPEORM_PORT as unknown) as number,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      migrationsRun: true,
      synchronize: false,
      logging: ['schema', 'error', 'warn', 'info', 'log'],
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/postgresql/*.js'],
      subscribers: ['.//subscriber/*.js'],
    }),
    DraftsModule,
    QueueModule,
    FeedModule,
    AnalyzerModule,
    PublisherModule,
    TwitterModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

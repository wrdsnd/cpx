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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
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
    }),
    TypeOrmModule.forRoot(),
    DraftsModule,
    QueueModule,
    FeedModule,
    AnalyzerModule,
    PublisherModule,
    TwitterModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

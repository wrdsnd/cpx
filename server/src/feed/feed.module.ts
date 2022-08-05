import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from '../auth/session.entity'
import { Subscription } from '../subscriptions/subscription.entity'
import { TwitterModule } from '../twitter/twitter.module'
import { TwitterService } from '../twitter/twitter.service'
import { Post } from '../queue/post.entity'
import { FeedResolver } from './feed.resolver'

@Module({
  imports: [
    TwitterModule,
    ConfigModule,
    TypeOrmModule.forFeature([Post, Subscription, Session]),
  ],
  providers: [FeedResolver, TwitterService],
})
export class FeedModule {}

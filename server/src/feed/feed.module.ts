import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subscription } from 'src/subscriptions/subscription.entity'
import { TwitterModule } from 'src/twitter/twitter.module'
import { TwitterService } from 'src/twitter/twitter.service'
import { Post } from '../queue/post.entity'
import { FeedResolver } from './feed.resolver'

@Module({
  imports: [
    TwitterModule,
    ConfigModule,
    TypeOrmModule.forFeature([Post, Subscription]),
  ],
  providers: [FeedResolver, TwitterService],
})
export class FeedModule {}

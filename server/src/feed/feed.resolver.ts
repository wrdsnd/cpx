import { Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logger, UseGuards } from '@nestjs/common'
import { Subscription } from '../subscriptions/subscription.entity'
import { TwitterService } from '../twitter/twitter.service'
import { AuthGuard } from '../guards'
import * as Schema from '../graphql'

@Resolver('Feed')
export class FeedResolver {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,

    private twitterService: TwitterService,
  ) {}

  private readonly logger = new Logger(FeedResolver.name)

  @UseGuards(AuthGuard)
  @Query()
  async likes(): Promise<Schema.News[]> {
    const likes = await this.twitterService.twitterClient.v1.favoriteTimelineByUsername("endless_cat");
    return Promise.all(likes.data.map(this.twitterService.convertTweetToNews))
  }

  @UseGuards(AuthGuard)
  @Query()
  async feed(): Promise<Schema.News[]> {
    const subscriptions = await this.subscriptionsRepository.find()
    const userIds = subscriptions.map((s) => s.userId)

    const tweetsResponses = await Promise.all(
      userIds.map(async (id) => {
        try {
          const tweets = await this.twitterService.twitterClient.v1.userTimeline(
            id,
            {
              exclude_replies: true,
              count: 100,
              // @ts-ignore
              include_rts: false,
              include_entities: true,
            },
          )

          return tweets.data
        } catch (err) {
          this.logger.warn(`Error while loading user ${id} tweets`, err)
        }
      }),
    )

    const results = tweetsResponses
      .flat()
      .filter((tweet) => {
        const hasMedia = !!tweet?.extended_entities?.media
        return hasMedia
      })
      .sort((t1, t2) => {
        const t1Date = new Date(t1['created_at'])
        const t2Date = new Date(t2['created_at'])

        if (t2Date > t1Date) {
          return 1
        }

        if (t2Date < t1Date) {
          return -1
        }

        return 0
      })
      .map(this.twitterService.convertTweetToNews)

    return Promise.all(results)
  }
}

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

  tweetToPost = async (tweet): Promise<Schema.News> => {
    const mediaEntities = tweet?.extended_entities?.media

    const media: Schema.TwitterMedia[] = mediaEntities.map(
      (entity: any): Schema.TwitterMedia => {
        switch (entity['type']) {
          case 'animated_gif': {
            return {
              url: entity['video_info']['variants'][0].url,
              type: Schema.MediaType.VIDEO,
            }
          }
          default: {
            return {
              url: entity.media_url_https,
              type: Schema.MediaType.IMAGE,
            }
          }
        }
      },
    )

    return {
      id: tweet.id_str,
      user: {
        name: tweet?.user?.screen_name,
      },
      message: tweet.text,
      media,
    }
  }

  @UseGuards(AuthGuard)
  @Query()
  async feed(): Promise<Schema.News[]> {
    const subscriptions = await this.subscriptionsRepository.find()
    const userIds = subscriptions.map((s) => s.userId)

    const tweetsResponses: any[] = await Promise.all(
      userIds.map((id) =>
        this.twitterService.tweets(id).catch((err) => {
          this.logger.warn(`Error while loading user ${id} tweets`, err)
        }),
      ),
    ).then((results) => results.flat().filter((tweet) => tweet))

    const results = tweetsResponses
      .filter((tweet) => {
        const extendedEntitiesMedia = tweet?.extended_entities?.media
        return Boolean(extendedEntitiesMedia)
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
      .map(this.tweetToPost)

    return Promise.all(results)
  }
}

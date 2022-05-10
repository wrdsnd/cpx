import { Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logger } from '@nestjs/common'
import { Subscription } from '../subscriptions/subscription.entity'
import { TwitterService } from '../twitter/twitter.service'
import { Post } from '../queue/post.entity'

@Resolver('Feed')
export class FeedResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,

    private twitterService: TwitterService,
  ) {}

  private readonly logger = new Logger(FeedResolver.name)

  tweetToPost = async (tweet) => {
    const mediaEntities = tweet?.extended_entities?.media

    const queueRecord = await this.postsRepository.findOne({
      sourceId: tweet.id_str,
    })

    const images = mediaEntities.map((entity) => ({
      src: entity.media_url_https,
    }))

    return {
      _id: tweet.id_str,
      id: tweet.id_str,
      inQueue: !!queueRecord,
      user: {
        name: tweet?.user?.screen_name,
      },
      message: tweet.text,
      images,
    }
  }

  @Query()
  async feed() {
    const subscriptions = await this.subscriptionsRepository.find()
    const userIds = subscriptions.map((s) => s.userId)

    const tweetsResponses = await Promise.all(
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

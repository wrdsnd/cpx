import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TweetV1, TwitterApi } from 'twitter-api-v2'
import * as Schema from '../graphql'

@Injectable()
export class TwitterService {
  public twitterClient: TwitterApi

  constructor(private configService: ConfigService) {
    const consumerKey = this.configService.get<string>(
      'TWITTER_APP_CONSUMER_KEY',
    )
    const consumerSecret = this.configService.get<string>(
      'TWITTER_APP_CONSUMER_SECRET',
    )
    this.twitterClient = new TwitterApi({
      appKey: consumerKey,
      appSecret: consumerSecret,
    })
  }

  public convertTweetToNews = async (tweet: TweetV1): Promise<Schema.News> => {
    const mediaEntities = tweet?.extended_entities?.media

    const media: Schema.TwitterMedia[] = mediaEntities.map(
      (entity): Schema.TwitterMedia => {
        switch (entity.type) {
          case 'video':
          case 'animated_gif': {
            const variants = entity.video_info.variants
              .filter((v) => v.content_type === 'video/mp4')
              .sort((v1, v2) => {
                if (v1.bitrate < v2.bitrate) {
                  return 1
                }

                if (v1.bitrate > v2.bitrate) {
                  return -1
                }

                return 0
              })

            const [firstVariant] = variants
            const [urlWithoutQuery] = firstVariant.url.split('?')

            return {
              url: urlWithoutQuery,
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
      message: tweet.full_text,
      media,
    }
  }
}

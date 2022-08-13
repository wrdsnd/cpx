import { map, get } from 'lodash'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { TwitterService } from '../twitter/twitter.service'
import { MediaType, News, TwitterMedia } from 'src/graphql'

@Resolver('News')
export class AnalyzeResolver {
  constructor(private twitterService: TwitterService) {}

  tweetToPost = async (status: any): Promise<News> => {
    const mediaEntities = get(status, 'extended_entities.media')

    const media: TwitterMedia[] = map(
      mediaEntities,
      (entity: any): TwitterMedia => {
        switch (entity['type']) {
          case 'animated_gif': {
            return {
              url: entity['video_info']['variants'][0].url,
              type: MediaType.VIDEO,
            }
          }
          default: {
            return {
              url: entity.media_url_https,
              type: MediaType.IMAGE,
            }
          }
        }
      },
    )

    return {
      id: status.id_str,
      user: {
        name: get(status, 'user.screen_name'),
      },
      message: status.text,
      media,
    }
  }

  @Query()
  async news(@Args('id') id: string): Promise<News> {
    const tweet: any = await this.twitterService.show({ id })
    return this.tweetToPost(tweet.data)
  }
}

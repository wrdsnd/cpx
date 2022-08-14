import { Args, Query, Resolver } from '@nestjs/graphql'
import { TwitterService } from '../twitter/twitter.service'
import { News } from '../graphql'

@Resolver('News')
export class AnalyzeResolver {
  constructor(private twitterService: TwitterService) {}

  @Query()
  async news(@Args('id') id: string): Promise<News> {
    const tweet = await this.twitterService.twitterClient.v1.singleTweet(id)
    return this.twitterService.convertTweetToNews(tweet)
  }
}

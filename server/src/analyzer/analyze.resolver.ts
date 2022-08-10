import { map, get } from 'lodash'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../queue/post.entity'
import { TwitterService } from '../twitter/twitter.service'

@Resolver('News')
export class AnalyzeResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    private twitterService: TwitterService,
  ) {}

  tweetToPost = async (status) => {
    const mediaEntities = get(status, 'extended_entities.media')
    const queueRecord = await this.postsRepository.findOne({
      sourceId: status.id_str,
    })

    const images = map(mediaEntities, (entity) => ({
      src: entity.media_url_https,
    }))

    return {
      _id: status.id_str,
      id: status.id_str,
      inQueue: !!queueRecord,
      user: {
        name: get(status, 'user.screen_name'),
      },
      message: status.text,
      images,
    }
  }

  @Query()
  async news(@Args('id') id: string) {
    const d: any = await this.twitterService.show({ id })

    return this.tweetToPost(d.data)
  }
}

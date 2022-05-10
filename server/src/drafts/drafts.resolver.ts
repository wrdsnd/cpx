import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { SaveAsDraftInput } from 'src/graphql'
import { IsNull, Repository } from 'typeorm'
import { Post } from '../queue/post.entity'

@Resolver('Drafts')
export class DraftsResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  @Query()
  async drafts() {
    return this.postsRepository.find({
      where: { deletedAt: IsNull(), sentAt: IsNull(), scheduledOn: IsNull() },
      order: { createdAt: 'DESC' },
    })
  }

  @Mutation()
  async saveAsDraft(@Args('input') input: SaveAsDraftInput) {
    const post = await this.postsRepository.findOne({ id: input.id })
    return this.postsRepository.save({
      ...post,
      scheduledOn: null,
      timeslot: null,
    })
  }
}

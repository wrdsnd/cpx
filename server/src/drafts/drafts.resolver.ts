import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { Post } from '../queue/post.entity'
import { SaveAsDraftInput } from '../graphql'
import { AuthGuard } from '../guards'

@Resolver('Drafts')
export class DraftsResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  @UseGuards(AuthGuard)
  @Query()
  async drafts() {
    return this.postsRepository.find({
      where: { deletedAt: IsNull(), sentAt: IsNull(), scheduledOn: IsNull() },
      order: { createdAt: 'DESC' },
      relations: ['media'],
    })
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async saveAsDraft(@Args('input') input: SaveAsDraftInput) {
    const post = await this.postsRepository.findOne({ where: { id: input.id } })
    return this.postsRepository.save({
      ...post,
      scheduledOn: null,
      timeslot: null,
    })
  }
}

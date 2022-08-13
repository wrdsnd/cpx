import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from './post.entity'

@Resolver('Post')
export class PostResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.postsRepository.findOneOrFail({ where: { id } })
  }

  @ResolveField()
  async timeslot(parent: Post) {
    const { timeslot } = await this.postsRepository.findOneOrFail({
      where: {
        id: parent.id,
      },
      relations: ['timeslot'],
    })
    return timeslot
  }
}

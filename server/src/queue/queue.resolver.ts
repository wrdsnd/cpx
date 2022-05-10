import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import * as moment from 'moment'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'
import { Post } from './post.entity'
import { RescheduleInput, SendToQueueInput } from 'src/graphql'
import { Timeslot } from './timeslot.entity'

@Resolver('Queue')
export class QueueResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Timeslot)
    private timeslotsRepository: Repository<Timeslot>,
  ) {}

  @Query()
  async queue() {
    const posts = await this.postsRepository.find({
      where: { sentAt: IsNull(), deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    })

    return posts.map((item) => {
      const formattedDate = moment(item.createdAt).format()

      return {
        ...item,
        isDraft: item.isDraft,
        sent: !!item.sentAt,
        createdAt: formattedDate,
      }
    })
  }

  @Mutation()
  async sendToQueue(@Args('input') input: SendToQueueInput): Promise<Post> {
    const { sourceId, text, media, scheduledOn, timeslotId, isDraft } = input

    const timeslot = await this.timeslotsRepository.findOne({
      where: { id: timeslotId },
    })

    const post = new Post()

    if (!isDraft) {
      post.timeslot = timeslot
      post.scheduledOn = scheduledOn
    }
    post.sourceId = sourceId
    post.sourceMeta = {
      id: sourceId,
      text,
      media,
    }

    const savedPost = await this.postsRepository.save(post)

    return {
      ...savedPost,
      isDraft: post.isDraft,
    }
  }

  @Mutation()
  async removeFromQueue(@Args('id') id: string) {
    const post = await this.postsRepository.findOne({ id })
    await this.postsRepository.save({ ...post, deletedAt: new Date() })
    return true
  }

  @Mutation()
  async reschedule(@Args('input') input: RescheduleInput) {
    const { id, scheduledOn, timeslotId } = input

    const post = await this.postsRepository.findOneOrFail({ id })
    const timeslot = await this.timeslotsRepository.findOneOrFail({
      id: timeslotId,
    })

    post.scheduledOn = scheduledOn
    post.timeslot = timeslot
    await this.postsRepository.save(post)

    return this.timeslotsRepository.find()
  }
}

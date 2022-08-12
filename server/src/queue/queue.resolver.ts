import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import * as moment from 'moment'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'
import { Post } from './post.entity'
import * as Schema from 'src/graphql'
import { Timeslot } from './timeslot.entity'
import { AuthGuard } from '../guards'
import { UseGuards } from '@nestjs/common'
import { Media } from './media.entity'

@Resolver('Queue')
export class QueueResolver {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(Timeslot)
    private timeslotsRepository: Repository<Timeslot>,
  ) {}

  @UseGuards(AuthGuard)
  @Query()
  async queue() {
    const posts = await this.postsRepository.find({
      where: { sentAt: IsNull(), deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      relations: ['media'],
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

  @UseGuards(AuthGuard)
  @Mutation()
  async sendToQueue(
    @Args('input') input: Schema.SendToQueueInput,
  ): Promise<Schema.Post> {
    const { sourceId, scheduledOn, timeslotId, isDraft } = input

    const timeslot = await this.timeslotsRepository.findOne({
      where: { id: timeslotId },
    })

    const post = new Post()

    const media = input.media.map((m) => {
      const record = new Media()
      record.url = m.url
      record.type = m.type
      return record
    })
    post.media = media
    post.content = input.text
    post.sourceId = sourceId

    if (!isDraft) {
      post.timeslot = timeslot
      post.scheduledOn = scheduledOn
    }
    post.sourceId = sourceId

    const savedPost = await this.postsRepository.save(post)

    return {
      id: savedPost.id,
      sentAt: savedPost.sentAt,
      sourceId: savedPost.sourceId,
      scheduledOn: savedPost.scheduledOn,
      createdAt: savedPost.createdAt,
      content: savedPost.content,
      isDraft: savedPost.isDraft,
      media,
    }
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async removeFromQueue(@Args('id') id: string) {
    const post = await this.postsRepository.findOne({ id })
    await this.postsRepository.save({ ...post, deletedAt: new Date() })
    return true
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async reschedule(@Args('input') input: Schema.RescheduleInput) {
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

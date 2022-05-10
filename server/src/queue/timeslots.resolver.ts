import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'
import { Post } from './post.entity'
import { Timeslot } from './timeslot.entity'

@Resolver('Timeslot')
export class TimeslotsResolver {
  constructor(
    @InjectRepository(Timeslot)
    private timeslotsRepository: Repository<Timeslot>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  @Query()
  async timeslots() {
    return this.timeslotsRepository.find({ order: { time: 'ASC' } })
  }

  @ResolveField()
  async posts(timeslot: Timeslot, input: { date: string }) {
    const res = await this.postsRepository.find({
      where: {
        timeslotId: timeslot.id,
        scheduledOn: input.date,
        deletedAt: IsNull(),
      },
    })

    return res
  }
}

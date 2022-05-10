import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.entity'
import { PostResolver } from './post.resolver'
import { QueueResolver } from './queue.resolver'
import { Timeslot } from './timeslot.entity'
import { TimeslotsResolver } from './timeslots.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Timeslot])],
  providers: [QueueResolver, PostResolver, TimeslotsResolver],
})
export class QueueModule {}

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm'
import { Schedule } from './schedule.entity'
import { Post } from './post.entity'

@Entity()
export class Timeslot {
  @PrimaryGeneratedColumn() id: string

  @Column({ type: 'time without time zone' })
  time: Date

  @ManyToOne(() => Schedule, (schedule) => schedule.timeslots)
  schedule: Schedule

  @OneToMany(() => Post, (post) => post.timeslot)
  posts: Post[]
}

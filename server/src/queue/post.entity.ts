import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Media } from './media.entity'
import { Timeslot } from './timeslot.entity'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string

  public get isDraft() {
    return Boolean(!this.scheduledOn && !this.timeslotId) || false
  }

  @Column()
  sourceId: string

  @Column({ nullable: true })
  content: string

  @Column()
  timeslotId: string

  @Column({ type: 'jsonb' })
  sourceMeta: {
    id: string
    text?: string
    media?: {
      src: string
    }[]
  }

  @Column({ type: 'timestamp without time zone', nullable: true })
  sentAt: Date

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date

  @CreateDateColumn() createdAt: Date

  @Column({ type: 'date', nullable: true })
  scheduledOn: Date

  @ManyToOne(() => Timeslot, (timeslot) => timeslot.posts)
  timeslot: Timeslot

  @OneToMany(() => Media, (media) => media.post, { cascade: true })
  media: Media[]
}

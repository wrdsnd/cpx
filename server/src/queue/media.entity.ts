import { MediaType } from 'src/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Post } from './post.entity'

@Entity()
export class Media {
  @PrimaryGeneratedColumn() id: string

  @CreateDateColumn() createdAt: Date

  @Column() url: string

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  type: MediaType

  @ManyToOne(() => Post, (post) => post.media)
  post: Post
}

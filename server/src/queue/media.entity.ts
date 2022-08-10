import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Post } from './post.entity'

export enum Type {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn() id: string

  @CreateDateColumn() createdAt: Date

  @Column() url: string

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type

  @ManyToOne(() => Post, (post) => post.media)
  post: Post
}

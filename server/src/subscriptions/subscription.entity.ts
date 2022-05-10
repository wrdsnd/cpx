import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn() id: number

  @Column() userId: string

  @CreateDateColumn() createdAt: string
}

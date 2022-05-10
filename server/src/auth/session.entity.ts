import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Session {
  @PrimaryGeneratedColumn() id: number

  @Column() sessionId: string

  @Column() userId: number

  @Column({ default: 'false' })
  active: boolean

  @CreateDateColumn() createdAt: string
}

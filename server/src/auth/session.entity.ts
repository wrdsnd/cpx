import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Session {
  @PrimaryGeneratedColumn() id: number

  @Column({ unique: true, nullable: false }) sessionId: string

  @Column({ default: 'false' })
  active: boolean

  @ManyToOne(() => User, (user: User) => user.sessions)
  public user: User

  @CreateDateColumn() createdAt: string
}

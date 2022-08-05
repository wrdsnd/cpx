import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Session } from './session.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number

  @Column() email: string
  @Column() hash: string

  @OneToMany(() => Session, (session: Session) => session.user)
  sessions: Session[]

  @CreateDateColumn() createdAt: string
}

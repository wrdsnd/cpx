import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number

  @Column() email: string
  @Column() salt: string
  @Column() hash: string

  @CreateDateColumn() createdAt: string
}

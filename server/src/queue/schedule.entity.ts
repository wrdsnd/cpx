import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Timeslot } from './timeslot.entity'

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn() id: number

  @OneToMany(() => Timeslot, (timeslot) => timeslot.schedule)
  timeslots: Timeslot[]
}

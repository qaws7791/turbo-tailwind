import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

export enum ReservationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Event, (event) => event.reservations)
  event: Event;

  @Column({
    type: 'timestamptz',
  })
  startDateTime: Date;

  @Column()
  duration: number;

  @Column()
  guestCount: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.Pending,
  })
  status: ReservationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

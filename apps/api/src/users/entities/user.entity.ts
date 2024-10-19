import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_PROVIDERS = {
  LOCAL: 'local',
  NAVER: 'naver',
  KAKAO: 'kakao',
} as const;

export type UserProvider = (typeof USER_PROVIDERS)[keyof typeof USER_PROVIDERS];

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: null })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: USER_PROVIDERS,
  })
  provider: UserProvider;

  @Column({
    nullable: true,
    default: null,
  })
  providerId: number;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.USER,
  })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}

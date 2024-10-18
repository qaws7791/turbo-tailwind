import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  // 이벤트 이름
  @Column({ length: 100 })
  name: string;

  // 이벤트 설명
  @Column({ length: 2000 })
  description: string;

  // 이벤트 이미지 목록
  @Column('simple-array')
  images: string[];

  // 이벤트 노출 여부
  @Column({ type: 'boolean', default: false })
  isVisible: boolean;

  // 이벤트 시작일
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  startDate: Date;

  // 이벤트 종료일
  @Column({ type: 'date', default: '2099-12-31' })
  endDate: Date;

  // 최소 예약 인원
  @Column({ type: 'int' })
  minBookingCount: number;

  // 최대 예약 인원
  @Column({ type: 'int' })
  maxBookingCount: number;

  // 이벤트당 예약 인원
  @Column({ type: 'int' })
  Stock: number;

  // 이벤트 주의사항
  @Column({ length: 5000, default: '' })
  bookingPrecaution: string;

  // 예약 받을 시간 단위(분)
  @Column({ type: 'int' })
  unitBookingTime: 30 | 60;

  @OneToMany(() => EventOperationTime, (operationTime) => operationTime.event, {
    cascade: true,
  })
  operationTimes: EventOperationTime[];
}

// 요일 enum을 객체로 분리
export enum DayOfWeek {
  Mon = 'mon',
  Tue = 'tue',
  Wed = 'wed',
  Thu = 'thu',
  Fri = 'fri',
  Sat = 'sat',
  Sun = 'sun',
}

export type TimeSlot = {
  startTime: string;
  endTime: string;
};

// 요일별 운영 시간을 저장하기 위한 운영 시간 엔티티
@Entity()
export class EventOperationTime {
  @PrimaryGeneratedColumn()
  id: number;

  // 요일
  @Column({ type: 'enum', enum: DayOfWeek })
  day: DayOfWeek;

  @Column({
    type: 'jsonb',
  })
  timeSlots: TimeSlot[];

  // 이벤트
  @ManyToOne(() => Event, (event) => event.operationTimes)
  event: Event;
}

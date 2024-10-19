import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Event } from '../events/entities/event.entity';
import * as dayjs from 'dayjs';
import { dayOfWeekMap } from '../events/events.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, createReservationDto: CreateReservationDto) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    // 1. 해당 이벤트가 존재하는지 확인
    const event = await this.eventRepository.findOne({
      where: { id: createReservationDto.eventId },
      relations: ['operationTimes'],
    });

    // 2. 예약 시간이 이벤트 시간인지 유효성 검사
    // 2-1. 이벤트 일자 확인
    const eventStartDate = dayjs(event.startDate);
    const eventEndDate = dayjs(event.endDate);
    const date = dayjs(createReservationDto.date);

    if (date.isBefore(eventStartDate) || date.isAfter(eventEndDate)) {
      throw new Error('예약 날짜가 이벤트 기간을 벗어납니다.');
    }
    // 2-2. 이벤트 영업 시간 확인
    const dayOfWeek = dayOfWeekMap[date.day()];
    const operationTime = event.isUniformOperationTime
      ? event.operationTimes[0]
      : event.operationTimes.find(
          (operationTime) => operationTime.day === dayOfWeek,
        );

    if (!operationTime) {
      throw new Error('해당 날짜에는 이벤트가 열리지 않습니다.');
    }

    // 예약 가능한 시작은 시간 시각인 operationTime.startTime 으로부터 event.unitBookingTime 분 간격씩 가능하고 operationTime.endTime 전까지만 가능하다
    const reservationTime = dayjs(createReservationDto.time, 'HH:mm');
    let eventStartTime = dayjs(operationTime.startTime, 'HH:mm');
    const eventEndTime = dayjs(operationTime.endTime, 'HH:mm');
    const unitBookingTime = event.unitBookingTime;

    // 예약 가능한 타임을  일단 모두 구하고, 일치하는지 확인한다
    const availableSlots = [];

    while (eventStartTime.isBefore(eventEndTime)) {
      const slotEnd = eventStartTime.add(unitBookingTime, 'minute');

      if (slotEnd.isBefore(eventEndTime)) {
        availableSlots.push(eventStartTime.format('HH:mm'));
      }

      eventStartTime = slotEnd;
    }

    if (!availableSlots.includes(reservationTime.format('HH:mm'))) {
      throw new Error('예약 시간이 올바르지 않습니다.');
    }

    // 3. 예약 생성
    const reservation = this.reservationRepository.create({
      user,
      event,
      startDateTime: dayjs(
        `${createReservationDto.date} ${reservationTime.format('HH:mm')}`,
        'YYYY-MM-DD HH:mm',
      ).toDate(),
      duration: event.unitBookingTime,
      guestCount: createReservationDto.guestCount,
      status: ReservationStatus.Pending,
    });

    await this.reservationRepository.save(reservation);
    return reservation;
  }
}

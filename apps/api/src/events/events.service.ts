import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, EventOperationTime } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const dayOfWeekMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(EventOperationTime)
    private operationTimeRepository: Repository<EventOperationTime>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const { operationTimes: operationTimesDto, ...eventDto } = createEventDto;
    const queryRunner =
      this.eventRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const event = this.eventRepository.create(eventDto);
      await queryRunner.manager.save(event);

      const operationTimes = operationTimesDto.map((operationTimeDto) => {
        return this.operationTimeRepository.create({
          ...operationTimeDto,
          event,
        });
      });

      event.operationTimes = operationTimes;
      await queryRunner.manager.save(event);

      await queryRunner.commitTransaction();
      return event;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findOne(id: number) {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['operationTimes'],
    });
  }

  // 입력받은 시작 시간과 끝 시간 사이에 있는 예약 가능한 스케쥴 배열을 생성하는 메서드를 구현합니다.
  async findSchedules(id: number, findScheduleDto: FindScheduleDto) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['operationTimes'],
    });

    const { unitBookingTime } = event;
    const { startDateTime, endDateTime } = findScheduleDto;

    const start = dayjs(startDateTime);
    const end = dayjs(endDateTime);

    const availableSlots = [];

    let currentDate = start;
    while (currentDate.isSameOrBefore(end)) {
      const dayOfWeek = dayOfWeekMap[currentDate.day()];
      const operationTime = event.isUniformOperationTime
        ? event.operationTimes[0]
        : event.operationTimes.find(
            (operationTime) => operationTime.day === dayOfWeek,
          );

      if (operationTime) {
        const openTime = dayjs(operationTime.startTime, 'HH:mm:ss');
        const closeTime = dayjs(operationTime.endTime, 'HH:mm:ss');
        let slotStart = currentDate
          .hour(openTime.hour())
          .minute(openTime.minute())
          .second(0);
        while (
          slotStart.isBefore(
            currentDate.hour(closeTime.hour()).minute(closeTime.minute()),
          )
        ) {
          const slotEnd = slotStart.add(unitBookingTime, 'minute');
          if (
            slotEnd.isSameOrBefore(
              currentDate.hour(closeTime.hour()).minute(closeTime.minute()),
            )
          ) {
            availableSlots.push({
              date: currentDate.format('YYYY-MM-DD'),
              time: slotStart.format('HH:mm'),
              endTime: slotEnd.format('HH:mm'),
            });
          }
          slotStart = slotEnd;
        }
      }

      currentDate = currentDate.add(1, 'day');
    }

    return availableSlots;
  }
}

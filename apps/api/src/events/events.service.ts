import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, EventOperationTime } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';

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
  findSchedules(id: number, findScheduleDto: FindScheduleDto) {
    const event = this.eventRepository.findOne({
      where: { id },
      relations: ['operationTimes'],
    });

    const { startDateTime, endDateTime } = findScheduleDto;
  }
}

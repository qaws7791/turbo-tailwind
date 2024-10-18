import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Auth } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Auth(USER_ROLES.ADMIN)
  create(@Body() body: CreateEventDto) {
    return this.eventsService.createEvent(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get(':id/schedules')
  findSchedules(
    @Param('id') id: string,
    @Query() findScheduleDto: FindScheduleDto,
  ) {
    return this.eventsService.findSchedules(+id, findScheduleDto);
  }
}

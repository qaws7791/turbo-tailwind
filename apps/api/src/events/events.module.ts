import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventOperationTime } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventOperationTime])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}

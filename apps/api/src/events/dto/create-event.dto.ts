import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DayOfWeek } from '../entities/event.entity';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsArray()
  @ArrayMaxSize(5)
  images: string[];

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsNumber()
  minBookingCount: number;

  @IsNumber()
  maxBookingCount: number;

  @IsString()
  bookingPrecaution: string;

  @IsNumber()
  unitBookingTime: 30 | 60;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateEventOperationTimeDto)
  operationTimes: CreateEventOperationTimeDto[];
}

class CreateEventOperationTimeDto {
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateTimeSlotDto)
  timeSlots: CreateTimeSlotDto[];
}

class CreateTimeSlotDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMilitaryTime,
  IsNumber,
  IsString,
  Min,
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

  @IsBoolean()
  isUniformOperationTime: boolean;

  @IsNumber()
  @Min(1)
  stock: number;

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

  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  endTime: string;
}

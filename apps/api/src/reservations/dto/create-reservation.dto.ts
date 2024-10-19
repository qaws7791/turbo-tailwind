import { Type } from 'class-transformer';
import { IsDate, IsInt, IsMilitaryTime, Min } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  eventId: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsMilitaryTime()
  time: string;

  @IsInt()
  @Min(1)
  guestCount: number;
}

import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class FindScheduleDto {
  @IsDate()
  @Type(() => Date)
  startDateTime: Date;

  @IsDate()
  @Type(() => Date)
  endDateTime: Date;
}

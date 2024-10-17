import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

// cursor based pagination with typeorm
export abstract class PageRequestDto {
  @IsOptional()
  @IsString()
  cursor: string | null = null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  count: number = 10;
}

import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateProductCategoryInput {
  @IsNumber()
  @Field(() => Number)
  id: number;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  order?: number;
}

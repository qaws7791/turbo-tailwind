import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsPositive,
  MinLength,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateProductVariantOptionValuesInput {
  @IsNumber()
  @Field(() => Int)
  optionValueId: number;

  @IsNumber()
  @Field(() => Int)
  optionId: number;
}

@InputType()
export class CreateProductVariantInput {
  @IsNumber()
  @Field(() => Int)
  productId: number;

  @IsNumber()
  @IsPositive()
  @Field(() => Float)
  price: number;

  @IsNumber()
  @Field(() => Int)
  stock: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(3)
  @Type(() => CreateProductVariantOptionValuesInput)
  @Field(() => [CreateProductVariantOptionValuesInput])
  optionValues: CreateProductVariantOptionValuesInput[];
}

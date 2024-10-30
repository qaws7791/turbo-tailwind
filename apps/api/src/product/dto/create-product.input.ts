import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateProductOptionValueInput {
  @IsString()
  @MaxLength(30)
  @Field()
  name: string;
}

@InputType()
export class CreateProductOptionInput {
  @IsString()
  @MaxLength(10)
  @Field()
  name: string;

  @IsNumber()
  @Field(() => Int)
  position: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => CreateProductOptionValueInput)
  @Field(() => [CreateProductOptionValueInput])
  options: CreateProductOptionValueInput[];
}

@InputType()
export class CreateProductInput {
  @IsString()
  @MaxLength(100)
  @Field()
  name: string;

  @IsString()
  @MaxLength(5000)
  @Field()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Field(() => [String])
  thumbnailImages: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Field({ nullable: true })
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Field({ nullable: true })
  modelName?: string;

  @IsNumber()
  @Field()
  category: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @Type(() => CreateProductOptionInput)
  @Field(() => [CreateProductOptionInput])
  productOptions: CreateProductOptionInput[];
}

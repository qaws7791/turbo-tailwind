import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateProductCategoryInput {
  @IsString()
  @MaxLength(10)
  @Field()
  name: string;
}

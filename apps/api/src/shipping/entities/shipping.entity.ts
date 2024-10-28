import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Shipping {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

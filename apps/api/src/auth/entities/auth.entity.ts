import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class UserSession {
  @Field()
  sub: string;

  @Field()
  role: string;
}

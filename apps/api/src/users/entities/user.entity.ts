import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

export enum UserProvider {
  LOCAL = 'local',
  KAKAO = 'kakao',
}

registerEnumType(UserProvider, {
  name: 'UserProvider',
});

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    unique: true,
  })
  @Field()
  email: string;

  @Column({
    nullable: true,
  })
  @Field()
  password: string;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserProvider,
  })
  @Field(() => UserProvider)
  provider: UserProvider;

  @Column({
    nullable: true,
  })
  @Field()
  providerId: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

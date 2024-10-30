import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOption } from './product-option.entity';

@Entity()
@ObjectType()
export class ProductOptionValue {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => ProductOption, (group) => group.values)
  @Field(() => ProductOption)
  option: ProductOption;

  @Column({ length: 30 })
  @Field()
  name: string;
}

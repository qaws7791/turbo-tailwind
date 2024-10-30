import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOptionValue } from './product-option-value.entity';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class ProductOption {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 10 })
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  position: number;

  @ManyToOne(() => Product, (product) => product.options)
  @Field(() => Product)
  product: Product;

  @OneToMany(() => ProductOptionValue, (option) => option.option)
  @Field(() => [ProductOptionValue])
  values: ProductOptionValue[];
}

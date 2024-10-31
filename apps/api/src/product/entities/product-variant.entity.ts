import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';
@Entity()
@Unique(['product', 'optionValueCombination'])
@ObjectType()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @Field(() => Product)
  product: Product;

  @Column()
  optionValueCombination: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  price: number;

  @Column({
    default: 0,
  })
  stock: number;

  @ManyToMany(() => ProductOptionValue)
  @JoinTable()
  @Field(() => [ProductOptionValue])
  optionValues: ProductOptionValue[];
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOptionGroup } from './product-option-group.entity';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class ProductOption {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => ProductOptionGroup, (group) => group.options)
  @Field(() => ProductOptionGroup)
  group: ProductOptionGroup;

  @Column({ length: 30 })
  @Field()
  name: string;

  @Column('int')
  @Field(() => Int)
  normalPrice: number;

  @Column('int')
  @Field(() => Int)
  salePrice: number;

  @Column('int')
  @Field(() => Int)
  stock: number;

  @ManyToOne(() => Product, (product) => product.options)
  @Field(() => Product)
  product: Product;
}

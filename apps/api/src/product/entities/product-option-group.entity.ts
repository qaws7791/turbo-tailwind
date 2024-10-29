import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOption } from './product-option.entity';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class ProductOptionGroup {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 10 })
  @Field()
  name: string;

  @ManyToOne(() => Product, (product) => product.groups)
  @Field(() => Product)
  product: Product;

  @OneToMany(() => ProductOption, (option) => option.group)
  @Field(() => [ProductOption])
  options: ProductOption[];
}

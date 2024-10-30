import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { ProductOptionValue } from './product-option-value.entity';
import { ProductOption } from './product-option.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  // product name
  @Column({ length: 100 })
  @Field()
  name: string;

  // product description
  @Column({ length: 5000, default: '' })
  @Field()
  description: string;

  @Column('text', { array: true })
  @Field(() => [String])
  thumbnailImages: string[];

  // product brand

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  brand?: string;

  // product modelname
  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  modelName?: string;

  // product visible status
  @Column({ default: false })
  @Field()
  isVisible: boolean;

  // category
  @ManyToOne(() => ProductCategory, (category) => category.products)
  @Field(() => ProductCategory)
  category: ProductCategory;

  @OneToMany(() => ProductOption, (option) => option.product)
  @Field(() => [ProductOption])
  options: ProductOption[];
}

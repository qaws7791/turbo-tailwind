import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  // category name
  @Column({ length: 10 })
  @Field()
  name: string;

  // order of category
  @Column()
  @Field(() => Int)
  order: number;

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product])
  products: Product[];
}

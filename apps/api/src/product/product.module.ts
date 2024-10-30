import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductResolver } from './resolvers/product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductOption } from './entities/product-option.entity';
import { ProductOptionValue } from './entities/product-option-value.entity';
import { ProductCategoryResolver } from './resolvers/product-category.resolver';
import { ProductCategoryService } from './services/product-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductOption,
      ProductOptionValue,
    ]),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductCategoryResolver,
    ProductCategoryService,
  ],
})
export class ProductModule {}

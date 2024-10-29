import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductResolver } from './resolvers/product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { ProductOption } from './entities/product-option.entity';
import { ProductCategoryResolver } from './resolvers/product-category.resolver';
import { ProductCategoryService } from './services/product-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductOptionGroup,
      ProductOption,
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

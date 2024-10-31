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
import { ProductVariant } from './entities/product-variant.entity';
import { ProductVariantResolver } from './resolvers/product-variant.resolver';
import { ProductVariantService } from './services/product-variant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductOption,
      ProductOptionValue,
      ProductVariant,
    ]),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductCategoryResolver,
    ProductCategoryService,
    ProductVariantResolver,
    ProductVariantService,
  ],
})
export class ProductModule {}

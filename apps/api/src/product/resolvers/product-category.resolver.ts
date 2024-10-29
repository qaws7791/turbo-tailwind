import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryInput } from '../dto/create-product-category.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { UpdateProductCategoryInput } from '../dto/update-product-category.input';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  // Queries

  @Query(() => [ProductCategory], { name: 'productCategories' })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Query(() => ProductCategory, { name: 'productCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoryService.findOne(id);
  }

  // Mutations

  @Mutation(() => ProductCategory, {
    name: 'createProductCategory',
    description: 'Create a new product category',
  })
  @UseGuards(AdminGuard)
  createProduct(
    @Args('createProductCategoryInput')
    createProductCategoryInput: CreateProductCategoryInput,
  ) {
    return this.productCategoryService.create(createProductCategoryInput);
  }

  @Mutation(() => ProductCategory, {
    name: 'updateProductCategory',
    description: 'Update a product category',
  })
  @UseGuards(AdminGuard)
  updateProduct(
    @Args('updateProductCategoryInput')
    updateProductCategoryInput: UpdateProductCategoryInput,
  ) {
    return this.productCategoryService.update(updateProductCategoryInput);
  }

  @Mutation(() => String, {
    name: 'removeProductCategory',
    description: 'Remove a product category',
  })
  @UseGuards(AdminGuard)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoryService.remove(id);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductVariant } from '../entities/product-variant.entity';
import { ProductVariantService } from '../services/product-variant.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { CreateProductVariantInput } from '../dto/create-product-variant.input';

@Resolver(() => ProductVariant)
export class ProductVariantResolver {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Query(() => [ProductVariant], { name: 'productVariants' })
  findByProductId(
    @Args('productId', { type: () => Number }) productId: number,
  ) {
    return this.productVariantService.findByProductId(productId);
  }

  @Mutation(() => ProductVariant, {
    name: 'createProductVariant',
    description: 'Create a new product variant',
  })
  @UseGuards(AdminGuard)
  createProductVariant(
    @Args('createProductVariantInput')
    createProductVariantInput: CreateProductVariantInput,
  ) {
    return this.productVariantService.create(createProductVariantInput);
  }
}

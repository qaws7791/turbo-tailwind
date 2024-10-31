import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from '../entities/product-variant.entity';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductOptionValue } from '../entities/product-option-value.entity';
import { CreateProductVariantInput } from '../dto/create-product-variant.input';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductOptionValue)
    private productOptionValueRepository: Repository<ProductOptionValue>,
  ) {}

  async create(createProductVariantInput: CreateProductVariantInput) {
    const {
      productId,
      optionValues: optionValuesInput,
      price,
      stock,
    } = createProductVariantInput;
    const optionValueIds = optionValuesInput.map((ov) => ov.optionValueId);

    // check product
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['options'],
    });

    if (!product) {
      throw new Error('Product not found');
    }
    // get option values

    const optionValues = await this.productOptionValueRepository.find({
      where: {
        id: In(optionValueIds),
      },
      relations: ['option'],
    });

    // validate option values
    const productOptionIds = new Set(product.options.map((o) => o.id));
    for (const optionValue of optionValues) {
      if (!productOptionIds.has(optionValue.option.id)) {
        throw new Error('Option not found');
      }
    }

    // create option value combination
    const optionValueCombination = JSON.stringify(
      optionValues.sort((a, b) => a.option.id - b.option.id).map((ov) => ov.id),
    );

    // check existing product variant using option value combination
    const existingProductVariant = await this.productVariantRepository.findOne({
      where: {
        product: { id: productId },
        optionValueCombination,
      },
    });

    if (existingProductVariant) {
      throw new Error('Product variant already exists');
    }

    // create product variant

    const variant = this.productVariantRepository.create({
      product,
      optionValues,
      optionValueCombination,
      price,
      stock,
    });

    return this.productVariantRepository.save(variant);
  }

  findByProductId(productId: Product['id']) {
    return this.productVariantRepository.find({
      where: { product: { id: productId } },
    });
  }
}

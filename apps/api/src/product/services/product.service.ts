import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductOption } from '../entities/product-option.entity';
import { ProductOptionValue } from '../entities/product-option-value.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue)
    private productOptionValueRepository: Repository<ProductOptionValue>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const {
      category: categoryId,
      productOptions,
      ...productData
    } = createProductInput;

    const category = await this.productCategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product = this.productRepository.create({
        name: productData.name,
        brand: productData.brand,
        modelName: productData.modelName,
        description: productData.description,
        thumbnailImages: productData.thumbnailImages,
        category,
      });

      const savedProduct = await queryRunner.manager.save(product);

      for (const productOptionData of productOptions) {
        const { options, ...optionGroup } = productOptionData;

        const productOption = this.productOptionRepository.create({
          ...optionGroup,
          product: savedProduct,
        });

        const savedOption = await queryRunner.manager.save(productOption);

        for (const optionData of options) {
          const productOptionValue = this.productOptionValueRepository.create({
            ...optionData,
            option: savedOption,
          });

          await queryRunner.manager.save(productOptionValue);
        }
      }

      await queryRunner.commitTransaction();
      return savedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['options', 'variants', 'variants.optionValues'],
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

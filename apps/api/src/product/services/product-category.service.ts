import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/product-category.entity';
import { Repository } from 'typeorm';
import { CreateProductCategoryInput } from '../dto/create-product-category.input';
import { UpdateProductCategoryInput } from '../dto/update-product-category.input';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async getLastOrdered() {
    const results = await this.productCategoryRepository.find({
      order: { order: 'DESC' },
      take: 1,
    });
    return results[0];
  }

  async create(createProductCategoryInput: CreateProductCategoryInput) {
    const lastOrderedCategory = await this.getLastOrdered();
    const order = lastOrderedCategory ? lastOrderedCategory.order + 1 : 1;
    const productCategory = this.productCategoryRepository.create({
      ...createProductCategoryInput,
      order,
    });
    return this.productCategoryRepository.save(productCategory);
  }

  async update(updateProductCategoryInput: UpdateProductCategoryInput) {
    const { id, ...data } = updateProductCategoryInput;
    const productCategory = await this.findOne(id);
    if (!productCategory) {
      throw new Error('Product category not found');
    }
    return this.productCategoryRepository.save({
      ...productCategory,
      ...data,
    });
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  findOne(id: ProductCategory['id']) {
    return this.productCategoryRepository.findOne({
      where: { id },
    });
  }

  async remove(id: ProductCategory['id']) {
    await this.productCategoryRepository.delete(id);
    return id;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../model/product.model';
import { Model } from 'mongoose';
import { ProductDto } from '../_dto/product.dto';

interface IProduct extends ProductDto {
  slug: string;
}

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(payload: IProduct) {
    return this.productModel.create(payload);
  }

  async findOne(query: any) {
    return this.productModel.findOne(query);
  }

  async find(query: any) {
    return this.productModel.find(query);
  }

  async findById(id: string) {
    return await this.productModel.findById(id);
  }

  async getAll() {
    return this.productModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);
  }

  async getByCategory(categoryName: string) {
    return this.productModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $match: {
          'category.name': categoryName,
        },
      },
    ]);
  }

  async findOneAndUpdate(productId: string, payload: any) {
    return this.productModel.findByIdAndUpdate(
      productId,
      {
        ...payload,
      },
      { new: true },
    );
  }

  async delete(productId: string) {
    return this.productModel.findByIdAndRemove(productId);
  }
}

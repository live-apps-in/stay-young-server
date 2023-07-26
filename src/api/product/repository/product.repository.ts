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
    return (
      await this.productModel.findOne(query).populate('category')
    ).populate('brand');
  }

  async search(searchQuery: string) {
    const regex = new RegExp(searchQuery, 'i');
    return this.productModel
      .find({
        name: { $regex: regex },
      })
      .populate('category');
  }

  async getByName(name: string) {
    return this.productModel.findOne({
      name: { $regex: new RegExp(name, 'i') },
    });
  }

  async findById(id: string) {
    return (await this.productModel.findById(id)).populate('brand');
  }

  async getAll() {
    return this.productModel.find().populate('category').populate('brand');
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
          'category.name': { $regex: new RegExp(categoryName, 'i') },
        },
      },
    ]);
  }

  async getByBrand(brandName: string) {
    return this.productModel.aggregate([
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $match: {
          'brand.name': { $regex: new RegExp(brandName, 'i') },
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

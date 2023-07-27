import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../model/product.model';
import { Model } from 'mongoose';
import { ProductDto } from '../_dto/product.dto';
import { Brand } from 'src/api/brand/model/brand.model';

interface IProduct extends ProductDto {
  slug: string;
}

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}

  async create(payload: IProduct) {
    return this.productModel.create(payload);
  }

  async findOne(query: any) {
    return this.productModel
      .findOne(query)
      .populate('category')
      .populate('brand');
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
    const brand: any = await this.brandModel.findOne({
      name: brandName,
    });
    return this.productModel.find({ brand: brand._id.toString() });
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

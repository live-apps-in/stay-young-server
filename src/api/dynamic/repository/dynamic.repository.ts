import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dynamic } from '../model/dynamic.model';
import { Model } from 'mongoose';

@Injectable()
export class DynamicRepository {
  constructor(
    @InjectModel(Dynamic.name) private dynamicModel: Model<Dynamic>,
  ) {}

  async getBestSellers() {
    return this.dynamicModel
      .findOne({ _id: '646773b40819d05003325706' })
      .populate('bestSellers.products');
  }

  async findOneFromBestSellers(productId: string) {
    return this.dynamicModel.findOne({
      'bestSellers.products': productId,
    });
  }

  async update(payload: any) {
    return this.dynamicModel.findOneAndUpdate(
      {
        _id: '646773b40819d05003325706',
      },
      { ...payload },
      { new: true },
    );
  }
}

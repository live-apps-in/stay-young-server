import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dynamic } from '../model/dynamic.model';
import { Model } from 'mongoose';
import { UpdateResult } from '../_dto/dynamic.dto';

@Injectable()
export class DynamicRepository {
  constructor(
    @InjectModel(Dynamic.name) private dynamicModel: Model<Dynamic>,
  ) {}

  async getBestSellers() {
    return this.dynamicModel.findOne().populate('bestSellers.products');
  }

  async findOneFromBestSellers(productId: string) {
    return this.dynamicModel.findOne({
      'bestSellers.products': productId,
    });
  }

  async update(payload: any): Promise<UpdateResult> {
    return this.dynamicModel.updateOne({}, payload);
  }
}

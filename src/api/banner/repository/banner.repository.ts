import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from '../model/banner.model';
import { Model } from 'mongoose';
import { BannerDto } from '../_dto/banner.dto';

@Injectable()
export class BannerRepository {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {}

  async create(bannerDto: BannerDto) {
    return this.bannerModel.create(bannerDto);
  }

  async getAll(query: any) {
    return this.bannerModel.find(query);
  }

  async findById(id: string) {
    return this.bannerModel.findById(id);
  }

  async findOne(query: any) {
    return this.bannerModel.findOne(query);
  }

  async countAll() {
    return this.bannerModel.count();
  }

  async update(bannerId: string, payload: any) {
    return this.bannerModel.findOneAndUpdate(
      {
        _id: bannerId,
      },
      { ...payload },
      { new: true },
    );
  }

  async delete(bannerId: string) {
    return this.bannerModel.findByIdAndRemove(bannerId);
  }
}

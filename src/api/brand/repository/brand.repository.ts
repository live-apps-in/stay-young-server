import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../model/brand.model';
import { BrandDto } from '../_dto/brand.dto';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  async create(brandModel: BrandDto) {
    return this.brandModel.create(brandModel);
  }

  async getByName(name: string) {
    return this.brandModel.findOne({ name: name.toLowerCase() });
  }

  async getAll() {
    return this.brandModel.find();
  }

  async getById(id: string) {
    return this.brandModel.findById(id);
  }

  async update(id: string, brandDto: BrandDto) {
    return this.brandModel.findByIdAndUpdate(
      id,
      {
        ...brandDto,
      },
      { new: true },
    );
  }

  async deleteById(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}

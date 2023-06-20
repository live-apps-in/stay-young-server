import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from '../model/coupon.model';
import { Model } from 'mongoose';
import { CouponDto } from '../_dto/coupon.dto';

@Injectable()
export class CouponRepository {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {}

  async create(couponDto: CouponDto) {
    return this.couponModel.create(couponDto);
  }

  async getAll() {
    return this.couponModel.find();
  }

  async getById(id: string) {
    return this.couponModel.findById(id);
  }

  async getByCode(code: string) {
    return this.couponModel.findOne({
      code: { $regex: new RegExp(code, 'i') },
    });
  }

  async update(id: string, payload: CouponDto) {
    return this.couponModel.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.couponModel.findByIdAndRemove(id);
  }
}

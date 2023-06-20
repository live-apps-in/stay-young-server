import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CouponDto } from '../_dto/coupon.dto';
import { CouponRepository } from '../repository/coupon.repository';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async create(couponDto: CouponDto) {
    const { code, expiry } = couponDto;

    if (await this.couponRepository.getByCode(code)) {
      throw new BadRequestException(`Coupon Code ${code} already Exists`);
    }

    const currentDate = new Date();
    const expiryDate = new Date(expiry);
    // Set the time of the current date to 00:00:00 to accept today's date
    currentDate.setHours(0, 0, 0, 0);
    if (expiryDate < currentDate) {
      throw new BadRequestException('Expiry date cannot be a past date');
    }

    return this.couponRepository.create(couponDto);
  }

  async getAll() {
    return this.couponRepository.getAll();
  }

  async getById(couponId: string) {
    return this.couponRepository.getById(couponId);
  }

  async update(couponId: string, couponDto: CouponDto) {
    const coupon = await this.couponRepository.getById(couponId);
    if (!coupon) {
      throw new NotFoundException('Coupon Not Found');
    }

    if (couponDto.code !== coupon.code) {
      if (await this.couponRepository.getByCode(couponDto.code)) {
        throw new BadRequestException('Coupon Code already Exists');
      }
    }

    if (coupon.expiry !== couponDto.expiry) {
      const currentDate = new Date();
      const expiryDate = new Date(couponDto.expiry);
      // Set the time of the current date to 00:00:00 to accept today's date
      currentDate.setHours(0, 0, 0, 0);
      if (expiryDate < currentDate) {
        throw new BadRequestException('Expiry date cannot be a past date');
      }
    }

    return this.couponRepository.update(couponId, couponDto);
  }

  async delete(couponId: string) {
    const coupon = await this.couponRepository.getById(couponId);
    if (!coupon) {
      throw new NotFoundException('Coupon Not Found');
    }

    await this.couponRepository.delete(couponId);
    return { message: 'Coupon Deleted Successfully' };
  }
}

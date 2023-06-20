import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, couponSchema } from './model/coupon.model';
import { CouponController } from './controller/coupon.controller';
import { CouponService } from './service/coupon.service';
import { CouponRepository } from './repository/coupon.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
})
export class CouponModule {}

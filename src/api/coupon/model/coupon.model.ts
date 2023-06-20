import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema()
export class Coupon {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  discountType: string;

  @Prop()
  discount: number;

  @Prop()
  image: string;

  @Prop()
  expiry: Date;
}

export const couponSchema = SchemaFactory.createForClass(Coupon);

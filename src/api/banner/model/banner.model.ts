import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner {
  @Prop()
  title: string;

  @Prop()
  subTitle: string;

  @Prop()
  tags: string[];

  @Prop()
  link: string;

  @Prop()
  image: string;

  @Prop()
  order: number;
}

export const bannerSchema = SchemaFactory.createForClass(Banner);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/api/category/model/category.model';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  subName: string;
  @Prop()
  slug: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Category' }],
    ref: 'Category',
  })
  category: Category[];
  @Prop()
  detailTags: string[];
  @Prop()
  images: string[];
  @Prop()
  price: number;
  @Prop()
  discountedPrice: number;
  @Prop({ default: 0 })
  stockAvailable: number;
  @Prop()
  description: string;
}

export const productSchema = SchemaFactory.createForClass(Product);

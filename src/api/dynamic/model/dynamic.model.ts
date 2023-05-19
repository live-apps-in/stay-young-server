import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/api/product/model/product.model';

export type DynamicDocument = HydratedDocument<Dynamic>;

@Schema()
export class Dynamic {
  @Prop({
    type: {
      products: [{ type: Types.ObjectId, ref: 'Product' }],
    },
  })
  bestSellers: { products: Product[] };
}

export const dynamicSchema = SchemaFactory.createForClass(Dynamic);

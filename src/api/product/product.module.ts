import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './model/product.model';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { CategoryModule } from '../category/category.module';
import { Brand, brandSchema } from '../brand/model/brand.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}

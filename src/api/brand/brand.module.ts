import { Module } from '@nestjs/common';
import { BrandController } from './controller/brand.controller';
import { BrandService } from './service/brand.service';
import { BrandRepository } from './repository/brand.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from './model/brand.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
  ],
  providers: [BrandService, BrandRepository],
  controllers: [BrandController],
})
export class BrandModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, bannerSchema } from './model/banner.model';
import { BannerService } from './service/banner.service';
import { BannerRepository } from './repository/banner.repository';
import { BannerController } from './controller/banner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: bannerSchema }]),
  ],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository],
})
export class BannerModule {}

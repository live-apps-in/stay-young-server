import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { DynamicService } from '../service/dynamic.service';
import { BestSellerDto } from '../_dto/dynamic.dto';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';

@Controller()
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}

  @Post('best-seller/add')
  @UseGuards(AuthGuard)
  addBestSeller(@Body() bestSellerDto: BestSellerDto) {
    return this.dynamicService.addToBestSellers(bestSellerDto.productId);
  }

  @Post('best-seller/remove')
  @UseGuards(AuthGuard)
  RemoveBestSeller(@Body() bestSellerDto: BestSellerDto) {
    return this.dynamicService.removeFromBestSellers(bestSellerDto.productId);
  }

  @Get('best-sellers')
  getBestSellers() {
    return this.dynamicService.getBestSellers();
  }
}

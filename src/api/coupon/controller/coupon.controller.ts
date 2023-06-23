import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponDto } from '../_dto/coupon.dto';
import { CouponService } from '../service/coupon.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() couponDto: CouponDto) {
    return this.couponService.create(couponDto);
  }

  @Get()
  async getAll() {
    return this.couponService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getSingleCoupon(@Param('id') id: string) {
    return this.couponService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() couponDto: CouponDto) {
    return this.couponService.update(id, couponDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.couponService.delete(id);
  }

  @Post('check-validity')
  checkValidity(@Body('code') code: string) {
    return this.couponService.checkValidity(code);
  }
}

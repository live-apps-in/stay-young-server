import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';
import { BrandDto } from '../_dto/brand.dto';
import { BrandService } from '../service/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() brandDto: BrandDto) {
    return this.brandService.createBrand(brandDto);
  }

  @Get()
  getAll() {
    return this.brandService.getAllBrands();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.brandService.getBrandById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() brandDto: BrandDto) {
    return this.brandService.updateBrand(id, brandDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductDto } from '../_dto/product.dto';
import { ProductService } from '../service/product.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('search')
  async search(@Query() query: any) {
    return this.productService.search(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productService.getProductBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productService.updateProduct(productDto, id);
  }

  @Get('category/:name')
  getByCategory(@Param('name') name: string) {
    return this.productService.getProductsByCategoryName(name);
  }

  @Get('brand/:name')
  getByBrand(@Param('name') name: string) {
    return this.productService.getProductsByBrandName(name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

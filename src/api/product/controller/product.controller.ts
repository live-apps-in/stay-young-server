import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
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

  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getSingleProduct(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productService.updateProduct(productDto, id);
  }

  @Get('/category/:name')
  getByCategory(@Param('name') name: string) {
    return this.productService.getProductsByCategoryName(name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

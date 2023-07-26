import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from '../repository/brand.repository';
import { BrandDto } from '../_dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandrepository: BrandRepository) {}

  async createBrand(brandDto: BrandDto) {
    const { name } = brandDto;
    if (await this.brandrepository.getByName(name)) {
      throw new BadRequestException(`Category ${name} already exists.`);
    }

    return this.brandrepository.create({
      name: name.toLowerCase(),
      ...brandDto,
    });
  }

  async getAllBrands() {
    return this.brandrepository.getAll();
  }

  async getBrandById(brandId: string) {
    return this.brandrepository.getById(brandId);
  }

  async updateBrand(brandId: string, brandDto: BrandDto) {
    const { name } = brandDto;

    const brand = await this.brandrepository.getById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    if (brand.name !== brandDto.name.toLowerCase()) {
      if (await this.brandrepository.getByName(name)) {
        throw new BadRequestException(`Brand ${name} already exists.`);
      }
    }

    return this.brandrepository.update(brandId, {
      name: name.toLowerCase(),
      ...brandDto,
    });
  }

  async deleteBrand(brandId: string) {
    if (!(await this.brandrepository.getById(brandId))) {
      throw new NotFoundException('Brand not found');
    }

    await this.brandrepository.deleteById(brandId);
    return { message: 'Brand Deleted Successfully' };
  }
}

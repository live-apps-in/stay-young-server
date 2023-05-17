import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerDto } from '../_dto/banner.dto';
import { BannerService } from '../service/banner.service';
import { AuthGuard } from 'src/api/auth/guards/auth.guard';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() bannerDto: BannerDto) {
    return this.bannerService.create(bannerDto);
  }

  @Get()
  async getAll() {
    return this.bannerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.bannerService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() bannerDto: BannerDto) {
    return this.bannerService.update(id, bannerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delte(@Param('id') id: string) {
    return this.bannerService.delete(id);
  }
}

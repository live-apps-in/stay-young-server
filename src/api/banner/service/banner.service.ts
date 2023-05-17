import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BannerRepository } from '../repository/banner.repository';
import { BannerDto } from '../_dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(private readonly bannerRepository: BannerRepository) {}
  async create(bannerDto: BannerDto) {
    const { order } = bannerDto;
    const count = await this.bannerRepository.documentsCount();
    if (count >= 5) {
      throw new BadRequestException('Maximum Banners Reached');
    }
    const bannerWithSameOrderExists = await this.bannerRepository.findOne({
      order,
    });
    if (bannerWithSameOrderExists) {
      throw new BadRequestException(
        `Banner with position ${order} already exists. Please select another position. `,
      );
    }
    return this.bannerRepository.create(bannerDto);
  }

  async getAll() {
    const banners = await this.bannerRepository.getAll({});
    const sortedBanners = banners.sort(
      (a: BannerDto, b: BannerDto) => a.order - b.order,
    );
    return sortedBanners;
  }

  async getById(id: string) {
    return this.bannerRepository.findById(id);
  }

  async update(bannerId: string, bannerDto: BannerDto) {
    const { order } = bannerDto;
    const banner = await this.bannerRepository.findById(bannerId);
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    if (banner.order !== order) {
      const bannerWithSameOrder = await this.bannerRepository.findOne({
        order,
      });
      if (bannerWithSameOrder) {
        // Swap the orders
        bannerWithSameOrder.order = banner.order;
        await this.bannerRepository.update(bannerWithSameOrder._id.toString(), {
          ...bannerWithSameOrder,
        });
      }
    }
    banner.order = order;
    return this.bannerRepository.update(bannerId, { ...banner });
  }

  async delete(bannerId: string) {
    const count = await this.bannerRepository.documentsCount();
    if (count === 2) {
      throw new BadRequestException(
        'At least two banners must be retained and cannot be deleted',
      );
    }
    const banner = await this.bannerRepository.findById(bannerId);
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    await this.bannerRepository.delete(bannerId);

    // Update the order of remaining banners
    const bannersToUpdate = await this.bannerRepository.getAll({
      order: { $gt: banner.order },
    });

    for (const bannerToUpdate of bannersToUpdate) {
      bannerToUpdate.order -= 1;
      await this.bannerRepository.update(
        bannerToUpdate._id.toString(),
        bannerToUpdate,
      );
    }
  }
}

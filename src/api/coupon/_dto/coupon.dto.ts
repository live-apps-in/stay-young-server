import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

enum DiscountType {
  PERCENTAGE = 'percentage',
  PRICE = 'price',
}

export class CouponDto {
  @ApiProperty({ example: 'Summer Discount' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'HXNDILON' })
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  readonly code: string;

  @ApiProperty({ example: 'percentage or price' })
  @IsNotEmpty()
  @IsEnum(DiscountType)
  readonly discountType: string;

  @ApiProperty({ example: 200 })
  @IsNotEmpty()
  @IsNumber()
  readonly discount: number;

  @ApiProperty({ example: '05-24-2023' })
  @IsNotEmpty()
  readonly expiry: Date;

  @ApiProperty({ example: 'https://domain/imagePath' })
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

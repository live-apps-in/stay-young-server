import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDto {
  @ApiProperty({ example: 'Brand Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Image URL' })
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

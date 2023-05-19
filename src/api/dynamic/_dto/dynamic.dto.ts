import { IsNotEmpty, IsString } from 'class-validator';

export class BestSellerDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;
}

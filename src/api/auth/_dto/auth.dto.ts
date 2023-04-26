import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly currentPassword: string;

  @ApiProperty({ example: 'newPassword' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly newPassword: string;

  @ApiProperty({ example: 'newPassword' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}

import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Field email cannot be empty' })
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Field password cannot be empty' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}

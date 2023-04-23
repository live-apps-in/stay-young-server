import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { LoginUserDto, ResetPasswordDto } from '../_dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/api/users/repository/users.repository';
import { v4 as uuid_v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepo: AuthRepository,
    @Inject(UserRepository) private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findUserByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const user_auth = await this.authRepo.findOneByUserId(user._id);

    const isPasswordMatches = bcrypt.compareSync(
      loginUserDto.password,
      user_auth.password,
    );
    if (!isPasswordMatches) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // Generate uuid
    const generated_uuid = uuid_v4();
    await this.authRepo.updateOne(user._id, {
      $push: { sessions: generated_uuid },
    });

    // Generate jwt
    const payload = {
      userId: user._id,
      role: user.role,
      sessionId: generated_uuid,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async logout(userData: any) {
    const updated_user_auth = await this.authRepo.updateOne(userData.userId, {
      $pull: { sessions: userData.sessionId },
    });
    if (!updated_user_auth) {
      throw new NotFoundException(`User not found`);
    }
    return { message: 'Logged out Successfully' };
  }

  async reset_password(resetPasswordDto: ResetPasswordDto, userData: any) {
    const user = await this.authRepo.findOneByUserId(userData.userId);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const isPasswordMatches = bcrypt.compareSync(
      resetPasswordDto.currentPassword,
      user.password,
    );
    // Checks current password and user entered password matches
    if (!isPasswordMatches) {
      throw new UnauthorizedException('Incorrect Password');
    }

    // Checks new password and confirm password matches
    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException("Password doesn't match");
    }

    const hashed_new_password = bcrypt.hashSync(
      resetPasswordDto.newPassword,
      13,
    );
    user.password = hashed_new_password;
    return user.save();
  }
}

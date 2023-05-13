import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { LoginUserDto, ResetPasswordDto } from '../_dto/auth.dto';
import { hashSync, compareSync } from 'bcrypt';
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
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const auth = await this.authRepo.findOneByUserId(user._id);

    if (!compareSync(password, auth.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // Generate uuid
    const sessionId = uuid_v4();
    await this.authRepo.updateOne(user._id, {
      $push: { sessions: sessionId },
    });

    // Generate jwt
    const payload = {
      userId: user._id,
      role: user.role,
      sessionId,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async logout(userData: any) {
    await this.authRepo.updateOne(userData.userId, {
      $pull: { sessions: userData.sessionId },
    });
    return { message: 'Logged out Successfully' };
  }

  async reset_password(resetPasswordDto: ResetPasswordDto, userData: any) {
    const { currentPassword, newPassword, confirmPassword } = resetPasswordDto;
    const user = await this.authRepo.findOneByUserId(userData.userId);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    // Checks current password and user entered password matches
    if (!compareSync(currentPassword, user.password)) {
      throw new UnauthorizedException('Incorrect Password');
    }

    // Checks new password and confirm password matches
    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Password doesn't match");
    }
    // updating new hashed password
    user.password = hashSync(newPassword, 13);
    return user.save();
  }
}

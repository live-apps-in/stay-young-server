import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { LoginUserDto } from '../_dto/auth.dto';
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
      throw new BadRequestException('Invalid Credentials');
    }

    const user_auth = await this.authRepo.findOneByUserId(user._id);

    const isPasswordMatches = bcrypt.compareSync(
      loginUserDto.password,
      user_auth.password,
    );
    if (!isPasswordMatches) {
      throw new BadRequestException('Invalid Credentials');
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
      throw new NotFoundException(
        `User with id ${userData.userId} is not found`,
      );
    }
    return { message: 'Logged out Successfully' };
  }
}

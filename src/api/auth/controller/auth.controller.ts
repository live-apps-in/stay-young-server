import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginUserDto } from '../_dto/auth.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Req } from 'src/core/custom_types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Request() req: Req) {
    return await this.authService.logout(req.userData);
  }
}

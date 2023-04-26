import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginUserDto, ResetPasswordDto } from '../_dto/auth.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Req } from 'src/core/custom_types';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Returns access_token' })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOkResponse({ description: 'logged out Successfully' })
  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Request() req: Req) {
    return this.authService.logout(req.userData);
  }

  @ApiOkResponse({ description: 'logged out Successfully' })
  @ApiBadRequestResponse({ description: "Password doesn't match" })
  @ApiUnauthorizedResponse({ description: 'Incorrect Password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(AuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Request() req: Req,
  ) {
    return this.authService.reset_password(resetPasswordDto, req.userData);
  }
}

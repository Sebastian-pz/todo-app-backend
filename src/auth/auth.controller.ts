import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signup(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto) {
    const validUser = await this.authService.validateUser(user);
    return this.authService.login(validUser);
  }

  // This is just for testing purposes
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async protectedRoute(@Request() req) {
    return { message: 'This is a protected route' };
  }
}

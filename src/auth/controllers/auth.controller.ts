import { Controller, Get,  Post, Req, Body, UsePipes, ValidationPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from '../services/auth.service';
import { UserDto } from '../dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/crud/user/services/user.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';

@ApiTags('auth_user')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: JwtAuthService,
    private readonly UserService: UserService,
  ) { }
  
  @ApiTags('Login')
  @Post('login')
  @UseGuards(LocalGuard)
  @UsePipes(new ValidationPipe())
  async login(@Req() req: Request) {
    return req.user;
  }

  @ApiTags('Status jwt token')
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @ApiTags('Register user')
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: UserDto) {

    await this.UserService.createUser(userDto);

    return await this.authService.signPayload(userDto);
  }
}

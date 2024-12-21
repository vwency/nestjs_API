import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Get all Users')
  @Get('all')
  @UsePipes(new ValidationPipe())
  async allUsers() {
    return await this.userService.getAll();
  }

  @ApiTags('Get user')
  @UsePipes(new ValidationPipe())
  @Get(':username')
  async GetById(@Param() userDto: UserDto) {
    return await this.userService.getUser(userDto);
  }
}

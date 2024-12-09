import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserIdDto } from '../dto/user_id.dto';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
      private readonly userService: UserService,

    ) {}

    @ApiTags('Get all Users')
    @Get('all')
    @UsePipes(new ValidationPipe())
    async get_allUser(){

      return await this.userService.getAll();
      
    }
    
    @ApiTags('Get user')
    @UsePipes(new ValidationPipe())
    @Get(':username')
    async id_get(@Param() userDto: UserDto) {
      
      return await this.userService.getUser(userDto);    
    }
}

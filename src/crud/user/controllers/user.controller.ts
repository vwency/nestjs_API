import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserIdDto } from '../dto/user_id.dto';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
    @Get(':user_id')
    @UsePipes(new ValidationPipe())
    async id_get(@Param() userDto: UserIdDto) {
      
      return await this.userService.getUser(userDto);
        
    }
}

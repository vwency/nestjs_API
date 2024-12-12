import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Header,
  BadRequestException,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../dto/column.dto';
import { ColumnService } from '../services/column.service';
import { v4 as uuidv4 } from 'uuid';
import { ParamDtoColumn } from '../dto/param.dto';
import { BodyDtoColumn } from '../dto/body.dto';
import { GetCurrentUser, GetCurrentUserId } from 'src/auth/common/decorators';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/')
export class ColumnController {
  constructor(private readonly ColumnService: ColumnService) {}

  @ApiTags('Get column')
  @UseGuards(AtGuard)
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(
    @Param() params: ParamDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.ColumnService.GetColumnData(params, userId);
  }

  @ApiTags('Create column')
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
  ) {
    const payload = { ...params, ...body };

    return await this.ColumnService.createColumn(payload);
  }

  @ApiTags('Delete column')
  @UseGuards(AtGuard)
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(@Param() params: ParamDtoColumn) {
    return await this.ColumnService.deleteColumn(params);
  }

  @ApiTags('Update column')
  @UseGuards(AtGuard)
  @Put(':column_name')
  async updateColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
  ) {
    return await this.ColumnService.updateColumn(params, body);
  }
}

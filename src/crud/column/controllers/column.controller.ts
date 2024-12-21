import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnService } from '../services/column.service';
import { ParamDtoColumn } from '../dto/param.dto';
import { BodyDtoColumn } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiTags('Get column')
  @UseGuards(AtGuard)
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(
    @Param() params: ParamDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.GetColumnData({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Create column')
  @UseGuards(AtGuard)
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.createColumn({
      ...params,
      ...body,
      user_id: userId,
    });
  }

  @ApiTags('Delete column')
  @UseGuards(AtGuard)
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(
    @Param() params: ParamDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.deleteColumn({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Update column')
  @UseGuards(AtGuard)
  @Put(':column_name')
  async updateColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.columnService.updateColumn(
      { ...params, user_id: userId },
      body,
    );
  }
}

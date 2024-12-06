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

@Controller('user/:user_id/columns/')
export class ColumnController {
  constructor(private readonly ColumnService: ColumnService) {}

  @ApiTags('Get column')
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(@Param() params: ParamDtoColumn) {
    return await this.ColumnService.GetColumnData(params);
  }

  @ApiTags('Create column')
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
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(@Param() params: ParamDtoColumn) {
    return await this.ColumnService.deleteColumn(params);
  }

  @ApiTags('Update column')

  @Put(':column_name')
  async updateColumn(
    @Param() params: ParamDtoColumn,
    @Body() body: BodyDtoColumn,
  ) {

    return await this.ColumnService.updateColumn(params, body);
  }
}

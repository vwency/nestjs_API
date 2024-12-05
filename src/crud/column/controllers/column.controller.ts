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

@Controller('user/:id/columns/')
export class ColumnController {
  constructor(private readonly ColumnService: ColumnService) {}

  @ApiTags('Get column')
  @Get(':column_name')
  async findUserColumns(@Param() colDto: ColumnDto) {
    return await this.ColumnService.GetColumnData(colDto);
  }

  @ApiTags('Create column')
  @UsePipes(new ValidationPipe())
  @Post('add')
  async createColumn(@Param() params: ParamDtoColumn, @Body() body: BodyDtoColumn) {


    const payload = { ...params, ...body };
    
    return await this.ColumnService.createColumn(payload);
  }

  @ApiTags('Delete column')
  @Delete(':column_name')
  async DeleteColumn(@Param() colDto: ColumnDto) {
    return await this.ColumnService.deleteColumn(colDto);
  }

  @ApiTags('Update column')
  @Put(':column_name')
  async updateColumn(
    @Param() colDto: ColumnDto,
    @Body('new_name') new_name: string,
  ) {
    return await this.ColumnService.updateColumn(colDto, new_name);
  }
}

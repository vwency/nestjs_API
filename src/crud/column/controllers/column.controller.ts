import { Controller, Body, Get, Put, Post, Delete, Param, Header, BadRequestException, NotFoundException, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../dto/column.dto';
import { ColumnService } from '../services/column.service';
import { col } from 'sequelize';

@Controller('user/:id/columns/')
export class ColumnController {
  constructor(
    private readonly ColumnService: ColumnService,

  ) { }

  @ApiTags('Get column')
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(@Param() colDto: ColumnDto) {

    return await this.ColumnService.GetColumnData(colDto);

  }

  @ApiTags('Delete column')
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(@Param() colDto: ColumnDto) {
    return await this.ColumnService.deleteColumn(colDto);
  }

  @ApiTags('Create column')
  @Post('add')
  @UsePipes(new ValidationPipe())
  async createColumn(@Param('id') id: ColumnDto["id"], @Body('column_name') column_name: ColumnDto["column_name"]) {
    return await this.ColumnService.createColumn(id, column_name);
  }

  @ApiTags('Update column')
  @Put(':column_name')
  @UsePipes(new ValidationPipe())
  async updateColumn(@Param() colDto: ColumnDto, @Body('new_name') new_name: string) {
    return await this.ColumnService.updateColumn(colDto, new_name);
  }
}

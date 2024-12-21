import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnDto } from '../dto/column.dto';
import { ParamDtoColumn } from '../dto/param.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyDtoColumn } from '../dto/body.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async FindColumn(params: ParamDtoColumn): Promise<any> {
    const column = await this.prisma.columns.findUnique({
      where: { ...params },
    });
    if (!column) throw new NotFoundException('Column not found');

    return column;
  }

  async GetColumnData(params: ParamDtoColumn): Promise<string> {
    const column = await this.FindColumn(params);
    return JSON.stringify(column);
  }

  async deleteColumn(params: ParamDtoColumn): Promise<any> {
    const column = await this.FindColumn(params);

    return await this.prisma.columns.delete({
      where: {
        column_id: column.column_id,
      },
    });
  }

  async createColumn(ColumnDto: ColumnDto): Promise<any> {
    if (await this.FindColumn(ColumnDto))
      throw new NotFoundException('Column existed found');

    return await this.prisma.columns.create({
      data: {
        ...ColumnDto,
      },
    });
  }

  async updateColumn(params: ParamDtoColumn, updatePayload: BodyDtoColumn) {
    const column = await this.prisma.columns.findUnique({
      where: {
        ...params,
      },
    });

    if (!column) throw new NotFoundException('Column not found');

    return await this.prisma.columns.update({
      where: { ...column },
      data: {
        ...updatePayload,
      },
    });
  }
}

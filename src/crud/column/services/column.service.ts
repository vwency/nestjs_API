import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ColumnDto } from '../dto/column.dto';
import { ParamDtoColumn } from '../dto/param.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyDtoColumn } from '../dto/body.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}




  async FindColumn(params: ParamDtoColumn): Promise<any> {
    return await this.prisma.columns.findUnique({ where: { ...params } });
  }





  async GetColumnData(params: ParamDtoColumn): Promise<string> {

    const column = await this.FindColumn(params);

    if (!column) throw new NotFoundException('Column not found');
    return JSON.stringify(column);
  }




  async deleteColumn(params: ParamDtoColumn): Promise<any> {

    const column = await this.FindColumn(params);

    if (!column) throw new NotFoundException('Column not found');

    return await this.prisma.columns.delete({
      where: { user_id: params.user_id, column_name: params.column_name },
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


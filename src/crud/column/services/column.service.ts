import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { ColumnDto } from '../dto/column.dto';
import { ParamDtoColumn } from '../dto/param.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
  ) {}

  async ExistedColumnData(params: ParamDtoColumn): Promise<any> {
    return await this.columnRepository.findOne({ where: { ...params } });
  }

  async GetColumnData(params: ParamDtoColumn): Promise<string> {
    const column = await this.ExistedColumnData(params);
    if (!column) throw new NotFoundException('Column not found');
    return JSON.stringify(column);
  }

  async deleteColumn(ColumnDto: ParamDtoColumn): Promise<any> {
    const deletedColumn = await this.columnRepository.delete({ ...ColumnDto });

    if (!!deletedColumn.affected)
      return { message: 'Column deleted successfully' };
    throw new NotFoundException('Column not found');
  }

  async createColumn(ColumnDto: ColumnDto): Promise<any> {
    if (await this.ExistedColumnData(ColumnDto))
      throw new NotFoundException('Column existed found');

    const newColumn = this.columnRepository.create({
      ...ColumnDto,
    });

    return await this.columnRepository.save(newColumn);
  }

  async updateColumn(params: ParamDtoColumn, updatePayload: Partial<Columns>) {
    const column = await this.ExistedColumnData(params);
    if (!column) throw new NotFoundException('Column not found');
    Object.assign(column, updatePayload);

    return await this.columnRepository.save(column);
  }
}

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

  async checkColumn(ColumnDto: ColumnDto) {
    const ExistColumn = await this.ExistedColumnData(ColumnDto);
    if (!ExistColumn) throw new BadRequestException('Column not found');
  }

  async GetColumnData(ColumnDto: ColumnDto): Promise<string> {
    await this.checkColumn(ColumnDto);
    const columnEx = await this.columnRepository.findOne({
      where: { user_id: ColumnDto.id, column_name: ColumnDto.column_name },
    });
    return JSON.stringify(columnEx);
  }

  async deleteColumn(ColumnDto: ParamDtoColumn): Promise<any> {
    const deletedColumn = await this.columnRepository.delete({
      user_id: ColumnDto.id,
      column_name: ColumnDto.column_name,
    });

    const deleted = !!deletedColumn.affected;
    if (deleted) return { message: 'Column deleted successfully' };
    throw new NotFoundException('Column not found');
  }

  async ExistedColumnData(columnDto: ColumnDto): Promise<boolean> {
    return !!(await this.columnRepository.findOne({
      where: { user_id: columnDto.id, column_name: columnDto.column_name },
    }));
  }

  async createColumn(ColumnDto: ColumnDto): Promise<any> {
    if (await this.ExistedColumnData(ColumnDto))
      throw new BadRequestException('Column arleady existed');

    const newColumn = this.columnRepository.create({
      user_id: ColumnDto.id,
      column_name: ColumnDto.column_name,
      description: ColumnDto.description,
    });

    const createdColumn = await this.columnRepository.save(newColumn);
    if (createdColumn) return { message: 'Column created successfully' };
    throw new BadRequestException('Create error');
  }

  async updateColumn(params: ParamDtoColumn, updatePayload: Partial<Columns>) {
    const columnEx = await this.columnRepository.findOne({
      where: { user_id: params.id, column_name: params.column_name },
    });

    if (!columnEx) {
      throw new NotFoundException('Column not found');
    }

    Object.assign(columnEx, updatePayload);

    await this.columnRepository.save(columnEx);
    return true;
  }
}

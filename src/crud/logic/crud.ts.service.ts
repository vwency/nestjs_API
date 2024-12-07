import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { ParamDtoColumn } from 'src/crud/column/dto/param.dto';
import { plainToClass } from 'class-transformer';
import { Users } from 'src/database/schema/user.entity';
import { ParamBDtoCard } from '../card/dto/cardBDto';
import { ParamBDtoComment } from '../comment/dto/commentB.dto';

@Injectable()
export class CrudLogic {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
  ) {}

  private async filterParams<T>(
    dto: new () => T,
    params: Record<string, any>,
  ): Promise<Partial<T>> {
    const instance = plainToClass(dto, {});
    const prototype = Object.keys(instance);
    const filteredParams = Object.keys(params)
      .filter((key) => prototype.includes(key))
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Partial<T>);

    return filteredParams;
  }

  async findColumnCard(
    dto: any,
    found: boolean,
  ): Promise<{ column: any; card: any }> {
    const column = await this.findColumn(dto);
    if (found && !column) {
      throw new NotFoundException('Column not found');
    }
    dto['column_id'] = column?.column_id;

    const card = await this.findCard(dto);

    if (found && !card) {
      throw new NotFoundException('Card not found');
    }

    if (!found && card) {
      throw new ConflictException('Card already exists');
    }

    return { column, card };
  }

  async findColumnCardComment(
    dto: any,
    found: boolean,
  ): Promise<{ column: any; card: any; comment: any }> {
    const column = await this.findColumn(dto);
    if (found && !column) {
      throw new NotFoundException('Column not found');
    }
    dto['column_id'] = column?.column_id;

    const card = await this.findCard(dto);

    if (found && !card) {
      throw new NotFoundException('Card not found');
    }

    if (!found && card) {
      throw new ConflictException('Card already exists');
    }

    const comment = await this.findComment(dto);

    return { column, card, comment };
  }

  async findComment(params: ParamBDtoComment) {
    const filteredParams = await this.filterParams(ParamBDtoComment, params);
    return await this.cardRepository.findOne({ where: { ...filteredParams } });
  }

  async findCard(params: ParamBDtoCard) {
    const filteredParams = await this.filterParams(ParamBDtoCard, params);
    return await this.cardRepository.findOne({ where: { ...filteredParams } });
  }

  async findColumn(params: ParamDtoColumn) {
    const filteredParams = await this.filterParams(ParamDtoColumn, params);
    return await this.columnRepository.findOne({
      where: { ...filteredParams },
    });
  }
}

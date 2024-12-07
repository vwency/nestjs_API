import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { CardDto } from '../dto/card.dto';
import { ColumnDto } from 'src/crud/column/dto/column.dto';
import { ParamDtoColumn } from 'src/crud/column/dto/param.dto';
import { ReflectableDecorator } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { ParamDtoCard } from '../dto/param.dto';
import { ParamBDtoCard } from '../dto/cardBDto';
@Injectable()
export class CardService {
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

  private async findColumnAndCard(
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

  async getCard(cardDto: ParamDtoCard): Promise<any> {
    const { column, card } = await this.findColumnAndCard(cardDto, true);

    return JSON.stringify(card);
  }

  async createCard(cardDto: CardDto): Promise<any> {
    const { column, card } = await this.findColumnAndCard(cardDto, false);

    const Card = this.cardRepository.create({
      ...cardDto,
    });

    return await this.cardRepository.save(Card);
    throw new BadRequestException('Create error');
  }

  async deleteCard(cardDto: CardDto): Promise<any> {
    const { column, card } = await this.findColumnAndCard(cardDto, true);

    const CardDelete = await this.cardRepository.delete({
      ...card,
    });
    if (!!CardDelete.affected) return { message: 'Card deleted successfully' };

    throw new BadRequestException('Card was not deleted');
  }

  async updateCard(params: ParamDtoCard, updatePayload: Partial<Cards>) {

    const { column, card } = await this.findColumnAndCard(params, true);
    Object.assign(card, updatePayload);
    return await this.cardRepository.save(card);
    
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { ParamDtoColumn } from 'src/crud/column/dto/param.dto';
import { plainToClass } from 'class-transformer';
import { ParamBDtoCard } from '../card/dto/cardBDto';
import { ParamBDtoComment } from '../comment/dto/commentB.dto';
import { ParamDtoComment } from '../comment/dto/param.dto';
import { ParamDtoUser } from '../user/dto/param.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrudLogic {
  constructor(
    private prisma: PrismaService
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
    const user = await this.findUser(dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    dto['user_id'] = user?.user_id;

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
    const user = await this.findUser(dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    dto['user_id'] = user?.user_id;

    const column = await this.findColumn(dto);

    if (found && !column) {
      throw new NotFoundException('Column not found');
    }

    dto['column_id'] = column?.column_id;

    const card = await this.findCard(dto);

    if (found && !card) {
      throw new NotFoundException('Card not found');
    }

    dto['card_id'] = card?.card_id;

    const comment = await this.findComment(dto);

    if (found && !comment) {
      throw new NotFoundException('Comment not found');
    }

    if (!found && comment) {
      throw new ConflictException('Comment already exists');
    }

    return { column, card, comment };
  }

  async findComment(params: ParamBDtoComment) {
    const filteredParams = await this.filterParams(ParamBDtoComment, params);
    return await this.prisma.comments.findFirst({
      where: { ...filteredParams },
    });
  }

  async findCard(params: ParamBDtoCard): Promise<any> {
    const filteredParams = await this.filterParams(ParamBDtoCard, params);

    return await this.prisma.cards.findFirst({
      where: { ...filteredParams },
    });
  }

  async findColumn(params: ParamDtoColumn) {
    const filteredParams = await this.filterParams(ParamDtoColumn, params);
    return await this.prisma.columns.findFirst({
      where: { ...filteredParams },
    });
  }

  async findUser(params: ParamDtoUser) {
    const filteredParams = await this.filterParams(ParamDtoUser, params);
    return await this.prisma.users.findFirst({
      where: { ...filteredParams },
    });
  }
}

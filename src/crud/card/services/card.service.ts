import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { CardDto } from '../dto/card.dto';
import { plainToClass } from 'class-transformer';
import { ParamDtoCard } from '../dto/param.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    private readonly crudLogic: CrudLogic
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


  async getCard(cardDto: ParamDtoCard): Promise<any> {
    const crudLogic = new CrudLogic(this.userRepository, this.columnRepository, this.cardRepository);
    const { column, card } = await crudLogic.findColumnCard(cardDto, true);

    return JSON.stringify(card);
  }

  async createCard(cardDto: CardDto): Promise<any> {

    const crudLogic = new CrudLogic(this.userRepository, this.columnRepository, this.cardRepository);
    const { column, card } = await crudLogic.findColumnCard(cardDto, false);

    const Card = this.cardRepository.create({
      ...cardDto,
    });

    return await this.cardRepository.save(Card);
    throw new BadRequestException('Create error');
  }

  async deleteCard(cardDto: CardDto): Promise<any> {
    
    const crudLogic = new CrudLogic(this.userRepository, this.columnRepository, this.cardRepository);
    const { column, card } = await crudLogic.findColumnCard(cardDto, true);

    const CardDelete = await this.cardRepository.delete({
      ...card,
    });
    if (!!CardDelete.affected) return { message: 'Card deleted successfully' };

    throw new BadRequestException('Card was not deleted');
  }

  async updateCard(params: ParamDtoCard, updatePayload: Partial<Cards>) {

    const crudLogic = new CrudLogic(this.userRepository, this.columnRepository, this.cardRepository);
    const { column, card } = await crudLogic.findColumnCard(params, true);

    Object.assign(card, updatePayload);
    return await this.cardRepository.save(card);
    
  }
}

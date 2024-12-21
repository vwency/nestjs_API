import {Injectable} from '@nestjs/common';
import { CardDto } from '../dto/card.dto';
import { ParamDtoCard } from '../dto/param.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CardService {
  constructor(
    private prisma: PrismaService,
  ) {}


  async getCard(cardDto: ParamDtoCard): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card } = await crudLogic.findColumnCardComment(cardDto, true);

    return JSON.stringify(card);
  }

  async createCard(cardDto: CardDto): Promise<any> {

    const crudLogic = new CrudLogic(this.prisma);
    const { column, card } = await crudLogic.findColumnCard(cardDto, false);
    cardDto.column_id = column.column_id;

    const Card = await this.prisma.cards.create({
      data: {
        ...cardDto
      }
    });

    return Card;
  }

  async deleteCard(cardDto: CardDto): Promise<any> {
    
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card } = await crudLogic.findColumnCard(cardDto, true);

    const deletedCard = await this.prisma.cards.delete({
      ...card,
    });

    return deletedCard;
  }

  async updateCard(params: ParamDtoCard, updatePayload: CardDto) {
    const crudLogic = new CrudLogic(this.prisma);
    
    const { column, card } = await crudLogic.findColumnCard(params, true);
  
    const updatedCard = await this.prisma.cards.update({
      where: {
        card_id: card.card_id,  
      },
      data: updatePayload, 
    });
  
    return updatedCard; 
  }
}

import { Injectable } from '@nestjs/common';
import { CardDto } from '../dto/card.dto';
import { ParamDtoCard } from '../dto/param.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyCardDto } from '../dto/body.dto';
import { ParamBDtoCard } from '../dto/cardBDto';
@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async getCard(cardDto: ParamDtoCard): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { card } = await crudLogic.findColumnCardComment(cardDto, true);

    return JSON.stringify(card);
  }

  async createCard(cardDto: CardDto): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column } = await crudLogic.findColumnCard(cardDto, false);

    cardDto.column_id = column.column_id;
    cardDto.column_name = undefined;

    const payload: ParamBDtoCard = cardDto;

    const Card = await this.prisma.cards.create({
      data: {
        ...payload,
      },
    });

    return Card;
  }

  async deleteCard(cardDto: CardDto): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { card } = await crudLogic.findColumnCard(cardDto, true);

    const deletedCard = await this.prisma.cards.delete({
      where: {
        card_id: card.card_id,
      },
    });

    return deletedCard;
  }

  async updateCard(params: ParamDtoCard, updatePayload: BodyCardDto) {
    const crudLogic = new CrudLogic(this.prisma);

    const { card } = await crudLogic.findColumnCard(params, true);

    const updatedCard = await this.prisma.cards.update({
      where: {
        card_id: card.card_id,
      },
      data: updatePayload,
    });

    return updatedCard;
  }
}

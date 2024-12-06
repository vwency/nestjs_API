import { Controller, Body, Put, Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../../column/dto/column.dto';
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';


@Controller('user/:user_id/columns/:column_name/cards/')
export class CardController {
  constructor(
    private readonly cardService: CardService,
  ) { }

  @ApiTags('Create card')
  @Post('add')
  async createCard(@Param() params: CardDto, @Body() body: CardDto) {
    const payload = { ...params, ...body };
    return await this.cardService.createCard(payload);
  }


  @ApiTags('Get card')
  @Get(':card_name')
  async getCards(@Param() cardDto: CardDto) {
    return await this.cardService.getCard(cardDto);
  }


  @ApiTags('Delete card')
  @Delete(':card_name')
  async deleteCard(@Param() cardDto: CardDto) {
    return await this.cardService.deleteCard(cardDto);
  }

  @ApiTags('Update card')
  @Put(':card_name')
  async updateCards(@Param() cardDto: CardDto, @Body('new_name') new_name: string) {
    return await this.cardService.updateCard(cardDto, new_name);
  }
}

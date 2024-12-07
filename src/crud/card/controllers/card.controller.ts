import { Controller, Body, Put, Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../../column/dto/column.dto';
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';
@Controller('user/:id/columns/:column_name/cards/')
export class CardController {
  constructor(
    private readonly cardService: CardService,
  ) { }

  @ApiTags('Create card')
  @Post('add')
  @UsePipes(new ValidationPipe())
  async createCards(@Param('id') id: ColumnDto["id"], @Param('column_name') column_name: ColumnDto["column_name"], @Body('card_name') card_name: string) {
    return await this.cardService.createCard(id, card_name, column_name);
  }


  @ApiTags('Get card')
  @Get(':card_name')
  @UsePipes(new ValidationPipe())
  async getCards(@Param() cardDto: CardDto) {
    return await this.cardService.getCard(cardDto);
  }


  @ApiTags('Delete card')
  @Delete(':card_name')
  @UsePipes(new ValidationPipe())
  async deleteCard(@Param() cardDto: CardDto) {
    return await this.cardService.deleteCard(cardDto);
  }

  @ApiTags('Update card')
  @Put(':card_name')
  @UsePipes(new ValidationPipe())
  async updateCards(@Param() cardDto: CardDto, @Body('new_name') new_name: string) {
    return await this.cardService.updateCard(cardDto, new_name);
  }
}

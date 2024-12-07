import { Controller, Body, Put, Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../../column/dto/column.dto';
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';
import { ParamDtoCard } from '../dto/param.dto';
import { BodyCardDto } from '../dto/body.dto';
import { BodyDtoColumn } from 'src/crud/column/dto/body.dto';


@Controller('user/:user_id/columns/:column_name/cards/')
export class CardController {
  constructor(
    private readonly cardService: CardService,
  ) { }

  @ApiTags('Get card')
  @Get(':card_name')
  async getCards(@Param() params: ParamDtoCard) {
    return await this.cardService.getCard(params);
  }

  // @ApiTags('Create card')
  // @Post('add')
  // @UsePipes(new ValidationPipe())
  // async createCard(@Param() params: ParamCardDto, @Body() body: BodyCardDto) {
  //   const payload = { ...params, ...body };
  //   return await this.cardService.createCard(payload);
  // }


  // @ApiTags('Delete card')
  // @Delete(':card_name')
  // async deleteCard(@Param() cardDto: CardDto) {
  //   return await this.cardService.deleteCard(cardDto);
  // }

  // @ApiTags('Update card')
  // @Put(':column_name')
  // async updateColumn(
  //   @Param() params: ParamCardDto,
  //   @Body() body: BodyDtoColumn,
  // ) {

  //   return await this.cardService.updateCard(params, body);
  // }
}



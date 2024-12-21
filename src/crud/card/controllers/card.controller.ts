import {
  Controller,
  Body,
  Put,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';
import { ParamDtoCard } from '../dto/param.dto';
import { BodyCardDto } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/:column_name/card/')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiTags('Get card')
  @Get(':card_name')
  async getCards(@Param() params: ParamDtoCard) {
    return await this.cardService.getCard(params);
  }

  @ApiTags('Create card')
  @UseGuards(AtGuard)
  @Post('add')
  async createCard(
    @Param() params: ParamDtoCard,
    @Body() body: BodyCardDto,
    @GetCurrentUserId() userId: string,
  ) {
    const payload = { ...params, ...body, user_id: userId };
    return await this.cardService.createCard(payload);
  }

  @ApiTags('Delete card')
  @UseGuards(AtGuard)
  @Delete(':card_name')
  async deleteCard(
    @Param() cardDto: CardDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.deleteCard({
      ...cardDto,
      user_id: userId,
    });
  }

  @ApiTags('Update card')
  @UseGuards(AtGuard)
  @Put(':card_name')
  async updateColumn(
    @Param() params: ParamDtoCard,
    @Body() body: BodyCardDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cardService.updateCard(
      { ...params, user_id: userId },
      body,
    );
  }
}

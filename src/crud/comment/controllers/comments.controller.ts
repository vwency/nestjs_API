import {
  Controller,
  Body,
  Put,
  Get,
  Post,
  Delete,
  Param,
  Header,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from '../dto/comment.dto';
import { CommentsService } from '../services/comments.service';
import { ParamDtoComment } from '../dto/param.dto';
import { BodyDtoComment } from '../dto/body.dto';

@Controller('user/:username/columns/:column_name/cards/:card_name/comments/')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}


  @ApiTags('Get comment')
  @Get(':comment_name')
  async getComment(@Param() params: ParamDtoComment) {
    return await this.commentService.getComment(params);
  }

  @Post('add')
  async addComment(@Param() params: ParamDtoComment, @Body() body: BodyDtoComment) {
    const comDto = { ...params, ...body };
    return await this.commentService.createComment(comDto);
  }
  @ApiTags('Delete comment')
  @Delete(':comment_name')
  async deleteComment(@Param() params: ParamDtoComment) {
    return await this.commentService.deleteComment(params);
  }

  @ApiTags('Update comment')
  @Put(':card_name')
  async updateColumn(
    @Param() params: ParamDtoComment,
    @Body() body: BodyDtoComment,
  ) {

    return await this.commentService.updateComment(params, body);
  }

}

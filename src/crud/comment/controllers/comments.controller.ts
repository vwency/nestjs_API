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
import { CommentsService } from '../services/comments.service';
import { ParamDtoComment } from '../dto/param.dto';
import { BodyDtoComment } from '../dto/body.dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { AtGuard } from 'src/auth/common/guards';

@Controller('column/:column_name/card/:card_name/comment/')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiTags('Get comment')
  @Get(':comment_name')
  async getComment(@Param() params: ParamDtoComment) {
    return await this.commentService.getComment(params);
  }

  @Post('add')
  @UseGuards(AtGuard)
  async addComment(
    @Param() params: ParamDtoComment,
    @Body() body: BodyDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    const comDto = { ...params, user_id: userId, ...body };
    return await this.commentService.createComment(comDto);
  }

  @ApiTags('Delete comment')
  @UseGuards(AtGuard)
  @Delete(':comment_name')
  async deleteComment(
    @Param() params: ParamDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.deleteComment({
      ...params,
      user_id: userId,
    });
  }

  @ApiTags('Update comment')
  @UseGuards(AtGuard)
  @Put(':card_name')
  async updateColumn(
    @Param() params: ParamDtoComment,
    @Body() body: BodyDtoComment,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.commentService.updateComment(
      { ...params, user_id: userId },
      body,
    );
  }
}

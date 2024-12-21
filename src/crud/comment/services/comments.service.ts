import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ParamData,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from '../dto/comment.dto';
import { ParamDtoComment } from '../dto/param.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { BodyDtoComment } from '../dto/body.dto';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getComment(params: ParamDtoComment): Promise<string> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    return JSON.stringify(comment);
  }

  async createComment(comDto: CommentDto): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      comDto,
      false,
    );
  
    comDto.column_id = column.column_id;
    comDto.card_id = card.card_id;

    const Card = this.prisma.comments.create({
      data: {
        ...comDto
      }
    });

    return Card;
    throw new BadRequestException('Create error');
  }


  async deleteComment(params: ParamDtoComment): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    const Delete = await this.prisma.comments.delete({
      where: {
        comment_id: comment.comment_id, 
      },
    });

    return Delete;
    
  }


async updateComment(params: ParamDtoComment, updatePayload: BodyDtoComment) {
  const crudLogic = new CrudLogic(this.prisma);
  
  const { column, card, comment } = await crudLogic.findColumnCardComment(
    params,
    true,
  );

  const updatedComment = await this.prisma.comments.update({
    where: {
      comment_id: comment.comment_id,  
    },
    data: updatePayload, 
  });

  return updatedComment;  
}


}

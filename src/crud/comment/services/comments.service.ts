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

    const Card = this.commentRepository.create({
      ...comDto,
    });

    return await this.commentRepository.save(Card);
    throw new BadRequestException('Create error');
  }

  async deleteComment(params: ParamDtoComment): Promise<any> {
    const crudLogic = new CrudLogic(this.prisma);
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    const CommentDelete = await this.commentRepository.delete({
      ...comment,
    });
  }

  async updateComment(params: ParamDtoComment, updatePayload: Partial<Comments>) {
    const crudLogic = new CrudLogic(this.prisma);
    
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    Object.assign(comment, updatePayload);
    return await this.commentRepository.save(comment);
  }

}

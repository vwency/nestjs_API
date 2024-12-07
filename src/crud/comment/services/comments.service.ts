import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ParamData,
} from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { CommentDto } from '../dto/comment.dto';
import { CrudLogic } from 'src/crud/logic/crud.ts.service';
import { ParamDtoComment } from '../dto/param.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async getComment(params: ParamDtoComment): Promise<string> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository
    );
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    return JSON.stringify(comment);
  }

  async createComment(comDto: CommentDto): Promise<any> {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );
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
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    const CommentDelete = await this.commentRepository.delete({
      ...comment,
    });
  }

  async updateComment(params: ParamDtoComment, updatePayload: Partial<Comments>) {
    const crudLogic = new CrudLogic(
      this.userRepository,
      this.columnRepository,
      this.cardRepository,
      this.commentRepository,
    );
    
    const { column, card, comment } = await crudLogic.findColumnCardComment(
      params,
      true,
    );

    Object.assign(comment, updatePayload);
    return await this.commentRepository.save(comment);
  }

}

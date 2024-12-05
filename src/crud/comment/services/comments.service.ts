import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/auth/dto/user.dto';
import { CommentDto } from '../dto/comment.dto';

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

  async getColumnAndCardId(
    comDto: CommentDto,
  ): Promise<{ column_id: string; card_id: string }> {
    const column = await this.columnRepository.findOne({
      where: {
        user_id: comDto.id,
        column_name: comDto.column_name,
      },
    });

    const card = await this.cardRepository.findOne({
      where: {
        user_id: comDto.id,
        column_id: column.column_id,
        card_name: comDto.card_name,
      },
    });

    return { column_id: column.column_id, card_id: card.card_id };
  }

  async commentExisted(comDto: CommentDto): Promise<boolean> {
    const { column_id, card_id } = await this.getColumnAndCardId(comDto);

    const comments = await this.commentRepository.findOne({
      where: {
        user_id: comDto.id,
        column_id,
        card_id,
        comment_name: comDto.comment_name,
      },
    });
    return !!comments;
  }

  async getComment(comDto: CommentDto): Promise<string> {
    if (!(await this.commentExisted(comDto)))
      throw new NotFoundException('comment not found');

    const { column_id, card_id } = await this.getColumnAndCardId(comDto);

    const comments = await this.commentRepository.findOne({
      where: {
        user_id: comDto.id,
        column_id,
        card_id,
        comment_name: comDto.comment_name,
      },
    });
    return JSON.stringify(comments);
  }

  async createComment(comDto: CommentDto): Promise<any> {

    if ((await this.commentExisted(comDto)))
      throw new NotFoundException('Arleady existed');

    const { column_id, card_id } = await this.getColumnAndCardId(comDto);

    const newComment = this.commentRepository.create({
      user_id: comDto.id,
      card_id,
      column_id,
      comment_name: comDto.comment_name,
      description: comDto.description
    });

    if (await this.commentRepository.save(newComment))
      return { message: 'Comment created successfully' };

    throw new BadRequestException('Failed create comment!');
  }

  async deleteComment(comDto: CommentDto): Promise<any> {

    if (!(await this.commentExisted(comDto)))
      throw new NotFoundException('comment not found');

    const { column_id, card_id } = await this.getColumnAndCardId(comDto);

    const deleted = await this.commentRepository.delete({
      id: comDto.id,
      column_id,
      card_id,
      comment_name: comDto.comment_name,
    });
    if (deleted) return { message: 'Comment deleted successfully' };
    throw new BadRequestException('Delete error');
  }

  async updateComment(comDto: CommentDto): Promise<any> {

    if (!(await this.commentExisted(comDto)))
      throw new NotFoundException('comment not found');

    const { column_id, card_id } = await this.getColumnAndCardId(comDto);

    const comments = await this.commentRepository.findOne({
      where: {
        user_id: comDto.id,
        column_id,
        card_id,
        comment_name: comDto.comment_name,
      },
    });

    comments.comment_name = comDto.new_name;
    await this.commentRepository.save(comments);
    return true;
  }
}

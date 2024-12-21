import { Module } from '@nestjs/common';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentsModule } from './comment/comments.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ColumnModule, CardModule, CommentsModule],
})
export class CrudModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentsModule } from './comment/comments.module';
import { PrismaModule } from 'src/prisma/prisma.module';  // Импортируем PrismaModule

@Module({
  imports: [
    PrismaModule,  // Импортируем PrismaModule, чтобы использовать PrismaService
    UserModule,
    ColumnModule,
    CardModule,
    CommentsModule,
  ],
  // Здесь могут быть другие необходимые провайдеры или экспорты, если нужно
})
export class CrudModule {}

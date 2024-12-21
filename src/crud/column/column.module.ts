import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';

@Module({
  controllers: [ColumnController],
  imports: [],
  providers: [ColumnService, JwtService],
})
export class ColumnModule {}

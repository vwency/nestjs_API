import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';

@Module({
  controllers: [ColumnController],
  imports: [
  ],
  providers: [
    ColumnService,
    JwtService,
    Repository,
  ],
})
export class ColumnModule { }


import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../database/schema/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import jwt_key from '../config/jwt_key';
import { UserService } from 'src/crud/user/services/user.service';
import { Columns } from 'src/database/schema/column.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { Cards } from 'src/database/schema/card.entity';
import { CommentsService } from 'src/crud/comment/services/comments.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]), 
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}

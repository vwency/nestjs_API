import { Module } from '@nestjs/common';
import { CardController } from './controllers/card.controller';
import { UserService } from '../user/services/user.service';
import { CardService } from './services/card.service';
import { JwtService } from '@nestjs/jwt';
import { CrudLogic } from '../logic/crud.ts.service';

@Module({
  controllers: [CardController],
  imports: [],
  providers: [UserService, CardService, JwtService, CrudLogic],
})
export class CardModule {}

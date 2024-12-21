import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class UserIdDto {
  @ApiProperty()
  @IsUUID()
  user_id: uuidv4;
}

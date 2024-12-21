import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Expose } from 'class-transformer';

export class ParamBDtoComment {
  @ApiProperty()
  @IsUUID()
  @Expose()
  user_id: uuidv4;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  column_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  card_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  comment_name: string;
}

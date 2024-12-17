import { IsString, IsNotEmpty, Length, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Expose } from 'class-transformer';


export class ParamDtoComment {

  @ApiProperty()
  @IsUUID()
  user_id: uuidv4;

  @ApiProperty()
  @IsString()
  column_name: string;

  @ApiProperty()
  @IsString()
  card_name: string;

  @ApiProperty()
  @IsUUID()
  comment_name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  column_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  card_id: string;

}

import { IsString, IsNotEmpty, Length, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Expose } from 'class-transformer';


export class ParamBDtoCard {

  @Expose()
  @ApiProperty()
  user_id: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  column_id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  card_name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

}

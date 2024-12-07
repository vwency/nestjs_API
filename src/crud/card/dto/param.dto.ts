import { IsString, IsNotEmpty, Length, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Expose } from 'class-transformer';


export class ParamDtoCard {

  @Expose()
  @ApiProperty()
  @IsString()
  column_name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  card_name: string;

  @Expose()
  @ApiProperty()
  @IsUUID()
  user_id: uuidv4;
  

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  column_id: string;

}

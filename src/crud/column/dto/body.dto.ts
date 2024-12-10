import { IsString, IsNotEmpty, Length, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';


export class BodyDtoColumn {

  @ApiProperty()
  @IsString()
  column_name: string;

  @IsString()
  description: string;

}

import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';


export class ColumnDto {

  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  column_name: string;

  @IsString()
  description: string;

}

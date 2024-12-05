import { IsString, IsNotEmpty, Length, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ParamDtoColumn {

  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  column_name: string;

}


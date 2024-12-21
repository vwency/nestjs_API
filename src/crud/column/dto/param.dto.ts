import { IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ParamDtoColumn {
  @ApiProperty()
  @IsUUID()
  @Expose()
  @IsOptional()
  user_id: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  column_name: string;
}

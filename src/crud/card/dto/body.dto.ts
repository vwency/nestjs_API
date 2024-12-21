import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BodyCardDto {
  @ApiProperty()
  @IsString()
  card_name: string;

  @ApiProperty()
  @IsString()
  description: string;
}

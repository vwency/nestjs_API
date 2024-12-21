import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  column_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  column_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  card_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

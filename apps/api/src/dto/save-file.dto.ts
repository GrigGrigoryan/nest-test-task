import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SaveFileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  data?: string;
}

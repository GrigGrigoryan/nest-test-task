import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveDatabaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  data?: string;
}

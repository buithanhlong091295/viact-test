import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  limit: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  page: string;
}

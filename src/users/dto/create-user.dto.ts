import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt({ message: 'Age must be an integer' })
  @Min(1, { message: 'Age must be a positive integer' })
  age: number;

  @ApiProperty()
  @IsEmail({})
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[^\s]+(\s+[^\s]+)*$/, { message: 'Invalid characters in name' })
  @IsNotEmpty()
  name: string;
}

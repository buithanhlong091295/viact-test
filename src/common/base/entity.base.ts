import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export class CustomBaseEntity extends BaseEntity {
  @ApiProperty({})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({})
  @CreateDateColumn({})
  createdAt: Date;

  @ApiProperty({})
  @UpdateDateColumn({})
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt!: Date;
}

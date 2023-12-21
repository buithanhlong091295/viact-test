import { ApiProperty } from '@nestjs/swagger';
import { CustomBaseEntity } from 'src/common/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends CustomBaseEntity {
  @ApiProperty({})
  @Column({})
  email: string;

  @ApiProperty({})
  @Column({})
  name: string;

  @ApiProperty({})
  @Column({})
  age: number;
}

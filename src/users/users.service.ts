import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async getAll(queries: GetAllUsersDto): Promise<[User[], number]> {
    const page = queries.page ? +queries.page : 1;
    const limit = queries.limit ? +queries.limit : 10;
    return this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(id: number, payload: UpdateUserDto): Promise<void> {
    await this.getById(id);
    await this.userRepository.save({ id, ...payload });
  }

  async create(payload: CreateUserDto): Promise<User> {
    if (await this.isEmailTaken(payload.email))
      throw new ConflictException('Email is already taken');
    return this.userRepository.save({ ...payload });
  }

  async remove(id: number): Promise<void> {
    const user = await this.getById(id);
    await this.userRepository.softRemove(user);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query() queries: GetAllUsersDto): Promise<[User[], number]> {
    return this.usersService.getAll(queries);
  }

  @Get('/:id')
  async getDetail(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getById(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(id, payload);
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}

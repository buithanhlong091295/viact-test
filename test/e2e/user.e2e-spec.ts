import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { Server } from 'http';
import { AppFactory } from 'test/factories/app.factory';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserFactory } from 'test/factories/user.factory';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

describe('App (e2e)', () => {
  let app: AppFactory;
  let server: Server;
  let dataSource: DataSource;
  let userService: UsersService;

  beforeAll(async () => {
    app = await AppFactory.new();
    server = app.instance.getHttpServer();
    dataSource = app.dbSource;
    userService = app.instance.get(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await app.cleanupDB();
  });

  describe('UsersModule', () => {
    describe('POST /users', () => {
      it('should create a new user', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));

        const createUserDto: CreateUserDto = {
          email: 'shenlong@gmail.com',
          name: 'Shen Long',
          age: 12,
        };

        return request(server)
          .post('/users')
          .send(createUserDto)
          .expect(HttpStatus.CREATED);
      });

      it('should return 409 for email already taken', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        await UserFactory.new(dataSource).create({
          email: 'shenlong@gmail.com',
          name: 'Bui Thanh Long',
          age: 27,
          id: 1001,
        });
        const createUserDto: CreateUserDto = {
          email: 'shenlong@gmail.com',
          name: 'Shen',
          age: 10,
        };

        return request(server)
          .post('/users')
          .send(createUserDto)
          .expect(HttpStatus.CONFLICT);
      });

      it('should return 400 if age invalid', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));

        const createUserDto: CreateUserDto = {
          email: 'shenlong1@gmail.com',
          name: 'Shen',
          age: 0,
        };

        return request(server)
          .post('/users')
          .send(createUserDto)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 if email invalid', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));

        const createUserDto: CreateUserDto = {
          email: 'shenlong2',
          name: 'Shen',
          age: 10,
        };

        return request(server)
          .post('/users')
          .send(createUserDto)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 if name invalid', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));

        const createUserDto: CreateUserDto = {
          email: 'shenlong2@gmail.com',
          name: '     ',
          age: 10,
        };

        return request(server)
          .post('/users')
          .send(createUserDto)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('PUT /users/:id', () => {
      it('should return 404 if user not found', async () => {
        const updateUserDto: UpdateUserDto = {
          name: 'Shen',
          age: 50,
        };

        return request(server)
          .put('/users/1000')
          .send(updateUserDto)
          .expect(HttpStatus.NOT_FOUND);
      });

      it('should return 200 for update user success', async () => {
        await UserFactory.new(dataSource).create({
          email: 'shenlong1000@gmail.com',
          name: 'Bui Thanh Long',
          age: 27,
          id: 1001,
        });
        const updateUserDto: UpdateUserDto = {
          name: 'Shen',
          age: 50,
        };

        return request(server)
          .put('/users/1001')
          .send(updateUserDto)
          .expect(HttpStatus.OK);
      });
    });
  });
});

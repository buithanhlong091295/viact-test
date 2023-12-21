import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('getById', () => {
    it('should return a user', async () => {
      const userId = 1;
      const user = new User();
      user.id = userId;
      user.email = 'shenlong101@gmail.com';
      user.age = 27;
      user.name = 'Long';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await usersService.getById(userId);

      expect(result).toEqual(user);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const userId = 1;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(usersService.getById(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('isEmailTaken', () => {
    it('should return true', async () => {
      const email = 'shenlong102@gmail.com';
      const user = new User();
      user.id = 1;
      user.email = email;
      user.age = 27;
      user.name = 'Shen Long';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await usersService.isEmailTaken(email);

      expect(result).toEqual(true);
    });

    it('should return false', async () => {
      const email = 'shenlong103@gmail.com';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = await usersService.isEmailTaken(email);

      expect(result).toEqual(false);
    });
  });

  describe('remove', () => {
    it('should remove successfully', async () => {
      const userId = 1;
      const user = new User();
      user.id = userId;
      user.email = 'shenlong101@gmail.com';
      user.age = 27;
      user.name = 'Long';
      //   jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const getByIdSpy = jest
        .spyOn(UsersService.prototype, 'getById')
        .mockResolvedValue(user);
      jest.spyOn(userRepository, 'softRemove').mockResolvedValue(undefined);

      await usersService.remove(userId);

      expect(getByIdSpy).toHaveBeenCalledWith(userId);
      expect(userRepository.softRemove).toHaveBeenCalledWith(user);
    });
  });
});

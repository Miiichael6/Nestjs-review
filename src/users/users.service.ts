import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, age, country, lastname, username } = createUserDto;
    try {
      const user = this.userRepository.create({
        name,
        age,
        country,
        lastname,
        username,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error: any) {
      this.handleDbError(error);
    }
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: { country: true, posts: true },
      select: { country: { name: true } },
    });

    return users;
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

      if (!user) {
        const notFoundUser = `User con Id:<<${id}>> doesn't exist`;
        throw new NotFoundException(notFoundUser);
      }

      return user;
    } catch (error: any) {
      this.handleDbError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = this.findOne(id)

      if (!user) {
        const notFoundUser = `User with Id:<<${id}>> doesn't exist`;
        throw new NotFoundException(notFoundUser);
      }

      const dataToUpdate = { id: id, ...updateUserDto };
      const userToUpdate = await this.userRepository.preload(dataToUpdate);

      await this.userRepository.save(userToUpdate);

      return { update: true, dataUpdated: userToUpdate };
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    const deleteUser = await this.userRepository.delete({ id: id });

    return deleteUser;
  }

  handleDbError(error: any) {
    const detailError = error.detail;
    const errorMessage = error.message;

    if (error.code === '23505') throw new BadRequestException(detailError);

    throw new NotFoundException(errorMessage);
  }

  async deleteAllUsers () {
    await this.userRepository.clear();

    return "all users deleted"
  }
}

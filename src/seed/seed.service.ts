import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { users } from './data/seedUsers';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async create() {
    try {
      const usersDeleted = await this.usersService.deleteAllUsers()

      console.log(usersDeleted);
      const usersToDb = [];

      users.forEach((user) => {
        const { age, country, lastname, name, username } = user;
        const userToInsert = this.usersService.create({
          age,
          lastname,
          name,
          username,
          country,
        });
        usersToDb.push(userToInsert);
      });

      await Promise.all(usersToDb);

      return 'users db filled';
    } catch (error) {
      throw this.usersService.handleDbError(error);
    }
  }
}

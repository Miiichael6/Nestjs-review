import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const { name } = createCountryDto;

      const country = this.countryRepository.create({
        name,
      });

      await this.countryRepository.save(country);

      return country;
    } catch (error: any) {
      this.handleCountryError(error);
    }
  }

  async findAll() {
    const countries = await this.countryRepository.find({
      relations: { users: true },
    });

    const simplifiedCountries = countries
      .map((country) => ({
        id: country.id,
        name: country.name,
        users: country.users.map((user) => ({
          id: user.id,
          name: user.name,
          username: user.username,
        })),
      }))
      .sort((countryA, countryB) => countryA.id - countryB.id);

    return simplifiedCountries;
  }

  async findOne(id: number) {
    try {
      const country = await this.countryRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!country) {
        throw new NotFoundException(`Country with (id)=(${id}) doesn't exist `);
      }

      return country;
    } catch (error) {
      this.handleCountryError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      const countryToDelete = await this.countryRepository.delete({ id: id });

      return countryToDelete;
    } catch (error) {
      this.handleCountryError(error);
    }
  }

  handleCountryError(error: any) {
    const errorDetail = error.detail;
    const errorMessage = error.message;

    if(errorDetail || errorMessage){
      throw new BadRequestException(`${errorDetail || errorMessage}`);
    }

    throw new InternalServerErrorException()
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
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
    const { name } = createCountryDto;

    const country = this.countryRepository.create({
      name,
    });

    await this.countryRepository.save(country);

    return country;
  }

  async findAll() {
    const countries = await this.countryRepository.find();

    return countries;
  }

  async findOne(id: number) {
    const country = await this.countryRepository.findOne({where: {
      id: id
    }})

    return country;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}

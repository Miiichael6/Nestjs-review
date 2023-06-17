import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
export const users: CreateUserDto[] = [
  {
    name: "Michael",
    lastname: "Canales",
    age: 19,
    username: "michaelmichael",
    country: 1
  },
  {
    name: "Pedro",
    lastname: "Perez",
    age: 15,
    username: "pedro789",
    country: 1
  },
  {
    name: "Kelvin",
    lastname: "kenots",
    age: 14,
    username: "kelvin14",
    country: 3
  },
  {
    name: "Ami",
    lastname: "Mizuno",
    age: 15,
    username: "ami_mizuno_pi",
    country: 3
  },
  {
    name: "Molly",
    lastname: "Mollyyy",
    age: 15,
    username: "kelvin_bestfriend",
    country: 3
  }
]
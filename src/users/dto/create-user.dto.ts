import { IsString, MaxLength, IsInt, MinLength } from "class-validator";
import { Country } from "src/countries/entities/country.entity";

export class CreateUserDto {

  
  @MaxLength(10)
  @MinLength(7)
  @IsString()
  username: string;

  @MaxLength(15)
  @MinLength(2)
  @IsString()
  name: string;
  
  @IsString()
  lastname: string;

  @IsInt()
  country: number;
  
  @IsInt()
  age: number;
}

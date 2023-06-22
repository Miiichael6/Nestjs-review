import { IsString, MaxLength, IsInt, MinLength, IsOptional } from "class-validator";
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
  @IsOptional()
  country?: number;
  
  @IsInt()
  age: number;
}

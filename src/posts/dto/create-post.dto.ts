import { IsInt, IsString, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @MaxLength(250)
  @IsString()
  content: string;

  @IsInt({message: "must have a user id(number) who made the post"})
  user: number
}

import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {

  @MaxLength(250)
  @MinLength(1)
  @IsString()
  content: string;

  // Id User
  @IsInt()
  userId: number;

  @IsInt()
  postId: number;
}

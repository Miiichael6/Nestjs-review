import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { content, userId, postId } = createCommentDto;

    const postExist = await this.postsService.findOne(postId);
    const userExist = await this.usersService.findOne(userId);

    if (!postExist) {
      throw new NotFoundException(`Post With Id=${postId} does not exist`);
    }
    if (!userExist) {
      throw new NotFoundException(`User with id=${userId} does not exist`);
    }

    const comment = this.commentsRepository.create({
      content,
      user: userId,
      post: postId,
    });

    await this.commentsRepository.save(comment);

    return comment;
  }

  async findAll() {
    const comments = await this.commentsRepository.find();
    return comments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

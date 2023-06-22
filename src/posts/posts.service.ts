import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { title, content, user } = createPostDto;

      const post = this.postsRepository.create({ title, content, user });
      await this.postsRepository.save(post);

      return post;
    } catch (error: any) {
      this.handlePostError(error);
    }
  }

  async findAll() {
    const posts = await this.postsRepository.find();

    return posts;
  }

  async findOne(id: number) {
    // try {
    const post = await this.postsRepository.findOne({
      relations: { user: true },
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with Id:${id} does not exist`);
    }

    return post;
    // } catch (error) {
    //   this.handlePostError(error)
    // }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {}

  async commentsOfOnePost(postId: number) {
    const postComments = await this.postsRepository.findOne({
      relations: { comments: true },
      where: { id: postId },
    });

    const comments = postComments.comments;

    return comments;
  }

  handlePostError(error: any) {
    const errorDetail = error.detail;
    const errorMessage = error.message;

    if (errorDetail || errorMessage) {
      throw new BadRequestException(`${errorDetail || errorMessage}`);
    }

    throw new InternalServerErrorException();
  }
}

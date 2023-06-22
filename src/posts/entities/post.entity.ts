import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  // Los posts le pertenecen a un solo usuario
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User | number;

  @OneToMany(() => Comment, (comment) => comment.post, {onDelete: "CASCADE"})
  comments: Comment[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

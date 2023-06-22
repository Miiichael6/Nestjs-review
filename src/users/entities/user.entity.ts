import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  lastname: string;
  
  @Column({ type: 'int' })
  age: number;
  
  // ? Many (User)   -    Many users
  // ? To (verbo)    -    To pertenecen
  // ? One (Country) -    One country
  // Muchos Usuarios tienen un pais
  @ManyToOne(() => Country, (country) => country.users, { onDelete: 'CASCADE' })
  country: Country | number;
  // un usuario tiene muchos posts
  @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {onDelete: "CASCADE"})
  comments: Comment[]
}

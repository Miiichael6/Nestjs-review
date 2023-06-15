import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  // Un pais tiene muchos Usuarios
  @OneToMany(() => User, (user) => user.country, {onDelete: "CASCADE"})
  users: User[];

}

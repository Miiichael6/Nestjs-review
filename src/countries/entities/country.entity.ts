import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  // * One(Country) => { Entidad en la que estamos}
  // * to(tiene(verbo)) => { cualquier verbo }
  // * Many(User) => { A la tabla A la que relacionamos}

  // ? Un pais(Country - One) To-tiene(contiene) muchos Usuarios(Users -Many)
  @OneToMany(() => User, (user) => user.country, { onDelete: 'CASCADE' })
  users: User[];
}

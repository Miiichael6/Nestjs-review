import { Country } from 'src/countries/entities/country.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  // Muchos Paises pertenecen a un Usuario
  @ManyToOne(() => Country, (country) => country.users, { onDelete: 'CASCADE' })
  country: Country;

  @Column({ type: 'int' })
  age: number;
}

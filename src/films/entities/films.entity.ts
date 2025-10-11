import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { RATINGS, SPECIAL_FEATURES } from '../enums/films.enum';

@Entity('film')
export class Films {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  release_year: number;

  @Column()
  language_id: number;

  @Column({ nullable: true })
  original_language_id: number;

  @Column()
  rental_duration: number;

  @Column()
  rental_rate: number;

  @Column()
  length: number;

  @Column()
  replacement_cost: number;

  @Column()
  rating: RATINGS;

  @Column({ type: 'set', enum: SPECIAL_FEATURES, nullable: true })
  special_features: SPECIAL_FEATURES[];

  @Column({ type: 'timestamp' })
  last_update: string;
}

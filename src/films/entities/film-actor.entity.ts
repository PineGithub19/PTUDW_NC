import { Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('film_actor')
export class FilmActor {
  @PrimaryColumn({ type: 'smallint', unsigned: true })
  actor_id: number;

  @PrimaryColumn({ type: 'smallint', unsigned: true })
  film_id: number;

  @UpdateDateColumn()
  last_update: string;
}

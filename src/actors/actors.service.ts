import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { FilmActor } from 'src/films/entities/film-actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
    @InjectRepository(FilmActor)
    private filmActorRepository: Repository<FilmActor>,
  ) {}

  async getAuthToken() {
    const response = await fetch('http://localhost:3000/auth/external_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'external_client_1',
        client_secret: process.env.EXTERNAL_CLIENT_1,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const { access_token } = (await response.json()) as {
      access_token: string;
    };

    return access_token;
  }

  create(createActorDto: CreateActorDto) {
    return this.actorsRepository.save(createActorDto);
  }

  findAll(): Promise<Actor[]> {
    return this.actorsRepository.find();
  }

  findOne(id: number) {
    return this.actorsRepository.findOneBy({ actor_id: id });
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorsRepository.update(id, updateActorDto);
  }

  remove(id: number) {
    return this.actorsRepository.delete(id);
  }
}

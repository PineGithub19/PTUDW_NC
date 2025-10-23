import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Films } from './entities/films.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-fillm.dto';
import { FilmActor } from './entities/film-actor.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films) private filmsRepository: Repository<Films>,
    @InjectRepository(FilmActor)
    private filmActorRepository: Repository<FilmActor>,
  ) {}

  async getAuthToken() {
    const response = await fetch('http://localhost:3000/auth/token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'actor_service',
        client_secret: process.env.ACTOR_SERVICE_SECRET,
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

  async findAll() {
    return await this.filmsRepository.find();
  }

  async findOne(id: number) {
    const film = await this.filmsRepository.findOne({
      where: {
        film_id: id,
      },
    });

    if (!film) throw new NotFoundException('Film Not Found');

    return film;
  }

  async findActorByFilm(film_id: number) {
    const token = await this.getAuthToken();
    const response = await this.filmActorRepository.findOne({
      where: {
        film_id: film_id,
      },
    });

    if (!response) throw new NotFoundException('Actor Not Found');

    const actorResponse = await fetch(
      `http://localhost:3000/actors/${response.actor_id}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const actorData = await actorResponse.json();

    return actorData;
  }

  async createFilm(createFilmDto: CreateFilmDto) {
    const film = this.filmsRepository.create(createFilmDto);
    return await this.filmsRepository.save(film);
  }

  async updatePatch(id: number, updateFilmDto: UpdateFilmDto) {
    await this.filmsRepository.update({ film_id: id }, updateFilmDto);
    return this.filmsRepository.findOneBy({ film_id: id });
  }

  async updatePut(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.findOneBy({ film_id: id });
    if (!film) throw new NotFoundException('Film not found');

    // Replace all fields (reset missing ones)
    const newFilm = this.filmsRepository.merge(film, updateFilmDto);
    return this.filmsRepository.save(newFilm);
  }

  async remove(id: number) {
    const result = await this.filmsRepository.delete({ film_id: id });
    if (result.affected === 0) throw new NotFoundException('Film Not Found');
    return { message: 'Delete Film successfully' };
  }
}

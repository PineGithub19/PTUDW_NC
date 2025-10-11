import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
  ) {}

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

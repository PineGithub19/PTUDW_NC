import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Films } from './entities/films.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogstashService } from '../logstash/logstash.service';
import { FilmActor } from './entities/film-actor.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films, FilmActor]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, LogstashService],
})
export class FilmsModule {}

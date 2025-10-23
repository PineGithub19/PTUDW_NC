import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Films } from './entities/films.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogstashService } from '../logstash/logstash.service';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [FilmsService, LogstashService],
})
export class FilmsModule {}

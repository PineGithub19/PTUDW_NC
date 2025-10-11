import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Films } from './entities/films.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}

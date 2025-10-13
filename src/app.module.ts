import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsModule } from './actors/actors.module';
import { Actor } from './actors/entities/actor.entity';
import { FilmsModule } from './films/films.module';
import { Films } from './films/entities/films.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ptudwnc',
      entities: [Actor, Films],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ActorsModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

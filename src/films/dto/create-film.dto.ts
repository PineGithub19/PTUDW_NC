import { IsEnum, IsInt, IsPositive, IsString, Max, Min } from 'class-validator';
import { RATINGS, SPECIAL_FEATURES } from '../enums/films.enum';

export class CreateFilmDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  release_year: number;

  @IsPositive()
  @IsInt()
  language_id: number;

  @IsPositive()
  @IsInt()
  original_language_id: number;

  @IsPositive()
  rental_duration: number;

  @IsPositive()
  rental_rate: number;

  @IsPositive()
  length: number;

  @IsPositive()
  replacement_cost: number;

  @IsEnum(RATINGS)
  rating: RATINGS;

  @IsEnum(SPECIAL_FEATURES, { each: true })
  special_features: SPECIAL_FEATURES[];
}

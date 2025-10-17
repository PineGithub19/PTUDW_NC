import {
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  Max,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RATINGS, SPECIAL_FEATURES } from '../enums/films.enum';

export class CreateFilmDto {
  @IsString()
  @MinLength(2, { message: 'Title must be at least 2 characters long' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
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

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-fillm.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RATINGS, SPECIAL_FEATURES } from './enums/films.enum';

@ApiTags('Films Controller')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all films',
    description: 'Get all films from database.',
  })
  @ApiResponse({ status: 200, description: 'The film has been updated.' })
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get film by ID',
    description: 'Retrieve detailed information about a film.',
  })
  @ApiResponse({ status: 200, description: 'Returns the film data.' })
  @ApiResponse({
    status: 404,
    description: 'Film not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new film',
    description: 'Add a new film record to the database.',
  })
  @ApiBody({
    description: 'Sample request body for creating a film',
    schema: {
      example: {
        title: 'Inception',
        description:
          'A thief who steals corporate secrets through dream-sharing technology.',
        release_year: 2010,
        language_id: 1,
        rental_duration: 6,
        rental_rate: 4.5,
        length: 100,
        replacement_cost: 15.88,
        rating: RATINGS.G,
        special_features: SPECIAL_FEATURES.BEHIND_THE_SCENES,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The film has been successfully created.',
  })
  createFilm(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a film',
    description: "Partially update a film's properties using PATCH.",
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Unique identifier of the film',
  })
  @ApiBody({
    description: 'Sample request body for partial updating a film',
    schema: {
      example: {
        title: 'Sample updated title',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The film has been updated.' })
  @ApiResponse({
    status: 404,
    description: 'Film not found.',
  })
  updatePatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.updatePatch(id, updateFilmDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a film',
    description: "Fullly update a film's properties using PATCH.",
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Unique identifier of the film',
  })
  @ApiBody({
    description: 'Sample request body for partial updating a film',
    schema: {
      example: {
        title: 'Inception - Sample PUT',
        description:
          'A thief who steals corporate secrets through dream-sharing technology. - Sample PUT',
        release_year: 2010,
        language_id: 1,
        rental_duration: 6,
        rental_rate: 4.5,
        length: 100,
        replacement_cost: 15.88,
        rating: RATINGS.G,
        special_features: [
          SPECIAL_FEATURES.TRAILERS,
          SPECIAL_FEATURES.BEHIND_THE_SCENES,
        ],
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The film has been updated.' })
  @ApiResponse({
    status: 404,
    description: 'Film not found.',
  })
  updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.updatePut(id, updateFilmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a film',
    description: 'Delete a film from database.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Unique identifier of the film',
  })
  @ApiResponse({ status: 200, description: 'The film has been deleted.' })
  @ApiResponse({
    status: 404,
    description: 'Film not found.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.remove(id);
  }
}

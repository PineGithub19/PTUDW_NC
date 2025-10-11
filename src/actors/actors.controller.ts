import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Actors Controller')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new actor',
    description: 'Add a new actor record to the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'The actor has been successfully created.',
  })
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all actors',
    description: 'Retrieve a list of all actors from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of actors retrieved successfully.',
  })
  findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get actor by ID',
    description: 'Retrieve detailed information about a specific actor.',
  })
  @ApiResponse({
    status: 200,
    description: 'Actor data retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update actor',
    description: "Partially update an actor's information by ID.",
  })
  @ApiResponse({
    status: 200,
    description: 'Actor updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete actor',
    description: 'Remove an actor from the database by ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Actor deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.actorsService.remove(+id);
  }
}

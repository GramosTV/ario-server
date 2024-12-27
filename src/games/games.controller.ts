import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';
import { unformatGameName } from 'src/utils/unformat';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() game: Game) {
    game.game = unformatGameName(game.game)
    return await this.gamesService.create(game);
  }

  @Get()
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gamesService.update(+id, updateGameDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}

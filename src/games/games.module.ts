import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './schemas/game.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    schema: GameSchema,
    name: 'Game'
  }])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule { }

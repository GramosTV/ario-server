import { Injectable } from '@nestjs/common';
import { Game, GameDocument } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GamesService {
  constructor(@InjectModel("Game") private productModel: Model<GameDocument>) { }
  async create(game: Game) {
    const createdProduct = new this.productModel(game);
    return await createdProduct.save();
  }

  async findAll(): Promise<Game[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Game> {
    return await this.productModel.findOne({ uuid: id }).exec();
  }

  // update(id: number, updateGameDto: UpdateGameDto) {
  //   return `This action updates a #${id} game`;
  // }

  remove(id: string) {
    return `This action removes a #${id} game`;
  }
}

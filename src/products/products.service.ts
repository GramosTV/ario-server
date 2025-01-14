import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import * as sharp from 'sharp';
import { GamesService } from 'src/games/games.service';
import { formatGameName, unformatGameName } from 'src/utils/unformat';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    private readonly gamesService: GamesService,
  ) {}

  async create(product: Product) {
    if (product.thumbnail) {
      product.thumbnail = await this.compressImage(product.thumbnail);
    }
    if (product.images && product.images.length > 0) {
      product.images = await Promise.all(product.images.map((image) => this.compressImage(image)));
    }
    const createdProduct = new this.productModel(product);
    return await createdProduct.save();
  }

  private async compressImage(base64Image: string): Promise<string> {
    const buffer = Buffer.from(base64Image, 'base64');
    const compressedBuffer = await sharp(buffer) // example resize, adjust as needed
      .jpeg({ quality: 75 }) // example compression, adjust as needed
      .toBuffer();
    return compressedBuffer.toString('base64');
  }

  async findAll() {
    const res = await this.productModel.find().exec();
    return res;
  }

  async findAllNoImg() {
    return await this.productModel.find({}, { images: 0 }).exec();
  }

  async findAllNoThumbnailAndImg() {
    return await this.productModel.find({}, { thumbnail: 0, images: 0 }).exec();
  }

  async findOne(id: string) {
    return await this.productModel.findOne({ id }).exec();
  }

  async findOneByName(game: string, name: string) {
    console.log(game, formatGameName(name));
    return await this.productModel
      .findOne({ name: { $regex: new RegExp(formatGameName(name), 'i') }, 'game.game': game })
      .exec();
  }

  async update(id: string, product: Product) {
    if (product.thumbnail) {
      product.thumbnail = await this.compressImage(product.thumbnail);
    }
    if (product.images && product.images.length > 0) {
      product.images = await Promise.all(product.images.map((image) => this.compressImage(image)));
    }
    return await this.productModel.findOneAndUpdate({ id }, product, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.productModel.findOneAndDelete({ id }).exec();
  }
}

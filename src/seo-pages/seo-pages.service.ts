import { Injectable } from '@nestjs/common';
import { SeoPage, SeoPageDocument } from './schemas/seo-pages.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeoPagesService {
  constructor(@InjectModel("SeoPage") private seoPageModel: Model<SeoPageDocument>) { }
  async create(seoPage: SeoPage) {
    const pages = await this.findAll();
    const index = pages.findIndex(page => page.game.game === seoPage.game.game)
    if (index > -1) {
      await this.seoPageModel.deleteOne({ id: pages[index].id }).exec();
    }
    const createdProduct = new this.seoPageModel(seoPage);
    return await createdProduct.save();
  }

  async findAll() {
    const res = await this.seoPageModel.find().exec();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} seoPage`;
  }

  async update(id: string, seoPage: SeoPage) {
    return await this.seoPageModel.findOneAndUpdate({ id }, seoPage, { new: true }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} seoPage`;
  }
}

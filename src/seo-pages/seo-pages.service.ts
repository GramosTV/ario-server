import { Injectable } from '@nestjs/common';
import { SeoPage, SeoPageDocument } from './schemas/seo-pages.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeoPagesService {
  constructor(@InjectModel("SeoPage") private seoPageModel: Model<SeoPageDocument>) { }
  async create(seoPage: SeoPage) {
    const createdProduct = new this.seoPageModel(seoPage);
    return await createdProduct.save();
  }

  findAll() {
    return `This action returns all seoPages`;
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

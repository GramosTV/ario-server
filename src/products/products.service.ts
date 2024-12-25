import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel("Product") private productModel: Model<ProductDocument>) { }


  async create(product: Product) {
    const createdProduct = new this.productModel(product);
    return await createdProduct.save();
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findOne({ id }).exec();
  }

  async update(id: string, product: Product) {
    return await this.productModel.findOneAndUpdate({ id }, product, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.productModel.findOneAndDelete({ id }).exec();
  }
}

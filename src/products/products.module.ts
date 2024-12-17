import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { PriceSchema, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    schema: ProductSchema,
    name: 'Product'
  }, { schema: PriceSchema, name: 'Price' }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }

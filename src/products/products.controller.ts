import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Game } from 'src/games/schemas/game.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Body() product: Omit<Product, 'thumbnail' | 'images'>,
  ) {
    console.log('yeah!!');
    const prices = typeof product.prices === 'string' ? JSON.parse(product.prices) : product.prices;
    product.prices = prices;

    const game = typeof product.game === 'string' ? JSON.parse(product.game) : product.game;
    product.game = game;

    product.spoofer = (product.spoofer as any) === 'true';

    const convertToBase64 = (file: Express.Multer.File) => {
      return file.buffer.toString('base64');
    };

    const thumbnailBase64 = files.thumbnail?.[0] ? convertToBase64(files.thumbnail[0]) : undefined;
    const imagesBase64 = files.images?.map((file) => convertToBase64(file));

    const productWithFiles = {
      ...product,
      thumbnail: thumbnailBase64,
      images: imagesBase64,
    };

    return await this.productsService.create(productWithFiles);
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return products.filter((product) => !product.hidden);
  }

  @Get('/no-img')
  async findAllNoImg() {
    const products = await this.productsService.findAllNoImg();
    return products.filter((product) => !product.hidden);
  }

  @Get('/no-thumbnail-and-img')
  async findAllNoThumbnailAndImg() {
    const products = await this.productsService.findAllNoThumbnailAndImg();
    return products.filter((product) => !product.hidden);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Get('/findByName/:game/:name')
  async findOneByName(@Param('game') game: string, @Param('name') name: string) {
    return await this.productsService.findOneByName(game, name);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  async update(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Param('id') id: string,
    @Body() product: Omit<Product, 'thumbnail' | 'images'>,
  ) {
    const prices = typeof product.prices === 'string' ? JSON.parse(product.prices) : product.prices;
    product.prices = prices;

    const game = typeof product.game === 'string' ? JSON.parse(product.game) : product.game;
    product.game = game;

    product.spoofer = (product.spoofer as any) === 'true';
    product.hidden = (product.hidden as any) === 'true';

    const convertToBase64 = (file: Express.Multer.File) => {
      return file.buffer.toString('base64');
    };

    const thumbnailBase64 = files.thumbnail?.[0] ? convertToBase64(files.thumbnail[0]) : undefined;
    const imagesBase64 = files.images?.map((file) => convertToBase64(file));

    // Merge product with base64 encoded images
    const productWithFiles = {
      ...product,
      thumbnail: thumbnailBase64,
      images: imagesBase64,
    };
    console.log(productWithFiles);
    // delete productWithFiles.thumbnail;
    // delete productWithFiles.images;
    return await this.productsService.update(id, productWithFiles);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('delete');
    return await this.productsService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { SeoPagesService } from './seo-pages.service';
import { SeoPagesController } from './seo-pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoPageSchema } from './schemas/seo-pages.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    schema: SeoPageSchema,
    name: 'SeoPage'
  }])],
  controllers: [SeoPagesController],
  providers: [SeoPagesService],
})
export class SeoPagesModule {}

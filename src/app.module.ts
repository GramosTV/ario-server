import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ario:ASGek95vYA9LRGvC@ario.upcth.mongodb.net/?retryWrites=true&w=majority&appName=ario'), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

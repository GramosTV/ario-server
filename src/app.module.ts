import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ario:ASGek95vYA9LRGvC@ario.upcth.mongodb.net/?retryWrites=true&w=majority&appName=ario'), ProductsModule, ConfigModule.forRoot(), GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

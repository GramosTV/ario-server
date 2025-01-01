import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { SeoPagesModule } from './seo-pages/seo-pages.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://127.0.0.1:27017/test?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7`), ProductsModule, ConfigModule.forRoot(), GamesModule, AuthModule, ScheduleModule.forRoot(), SeoPagesModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }


// imports: [MongooseModule.forRoot('mongodb+srv://ario:ASGek95vYA9LRGvC@ario.upcth.mongodb.net/?retryWrites=true&w=majority&appName=ario'), ProductsModule, ConfigModule.forRoot(), GamesModule, AuthModule, ScheduleModule.forRoot()],


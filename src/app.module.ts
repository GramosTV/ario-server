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

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ario:ASGek95vYA9LRGvC@ario.upcth.mongodb.net/?retryWrites=true&w=majority&appName=ario'), ProductsModule, ConfigModule.forRoot(), GamesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule { }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';
import { Game, GameSchema } from 'src/games/schemas/game.schema';
import { Status, Timeframe } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class Price {
  @Prop({ required: true })
  cost: number;

  @Prop({ required: true, enum: Timeframe })
  type: Timeframe;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
export type ProductDocument = Product & Document;
@Schema()
export class Product extends Document {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ type: GameSchema, required: true })
  game: Game;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ type: [PriceSchema], required: true })
  prices: Price[];

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true, enum: Status })
  status: Status;

  @Prop()
  description?: string;

  @Prop()
  descriptionTr?: string;

  @Prop()
  descriptionRu?: string;

  @Prop()
  seoTitle?: string;

  @Prop()
  seoDescription?: string;

  @Prop()
  video?: string;

  @Prop({ default: 0 })
  order?: number;

  @Prop({ required: true })
  spoofer: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

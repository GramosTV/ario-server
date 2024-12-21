import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timeframe } from 'src/types';
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

    @Prop({ required: true })
    game: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [PriceSchema], required: true })
    prices: Price[];

    @Prop({ required: true })
    link: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true })
    images: string[];
}


export const ProductSchema = SchemaFactory.createForClass(Product);
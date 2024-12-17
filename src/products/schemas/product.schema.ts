import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timeframe } from 'src/types';
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
    @Prop({ required: true })
    game: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [PriceSchema], required: true })
    prices: Price[];

    @Prop({ required: true })
    link: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
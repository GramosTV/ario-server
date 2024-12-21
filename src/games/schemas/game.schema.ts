import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status, Timeframe } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export type GameDocument = Game & Document;
@Schema()
export class Game extends Document {
    @Prop({ default: uuidv4 })
    id: string;

    @Prop({ required: true })
    game: string;
}




export const GameSchema = SchemaFactory.createForClass(Game);
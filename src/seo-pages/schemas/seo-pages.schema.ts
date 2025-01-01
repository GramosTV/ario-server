import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Game, GameSchema } from 'src/games/schemas/game.schema';
import { Status, Timeframe } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export type SeoPageDocument = SeoPage & Document;
@Schema()
export class SeoPage extends Document {
    @Prop({ default: uuidv4 })
    id: string;

    @Prop({ type: GameSchema, required: true })
    game: Game;

    @Prop()
    description?: string;

    @Prop()
    descriptionTr?: string;

    @Prop()
    descriptionRu?: string;
}




export const SeoPageSchema = SchemaFactory.createForClass(SeoPage);
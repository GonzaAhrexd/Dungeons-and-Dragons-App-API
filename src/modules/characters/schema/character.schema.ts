import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true, trim: true })
  userId!: string;

  @Prop({ trim: true })
  campaignId!: string;
  @Prop({ required: true, trim: true })
  name!: string;
  @Prop({ trim: true })
  race!: string;
  @Prop({ trim: true })
  class!: string;
  @Prop({ trim: true })
  subclass!: string;
  @Prop({ trim: true })
  alignment!: string;
  @Prop({ default: 1 })
  level!: number;
  @Prop({ default: [] })
  bars!: { name: string; total: number; actual: number; color: string }[];
  @Prop({ trim: true })
  currentState!: string;
  @Prop({
    type: {
      strength: { type: Number, default: 0 },
      dexterity: { type: Number, default: 0 },
      constitution: { type: Number, default: 0 },
      intelligence: { type: Number, default: 0 },
      wisdom: { type: Number, default: 0 },
      charisma: { type: Number, default: 0 },
    },
    default: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  })
  attributes!: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  @Prop({ default: [] })
  inventory!: { name: string; notes: string; quantity: number }[];
  @Prop({ default: [] })
  equipment!: [{ icon: string; name: string; description: string }];
  @Prop({ trim: true })
  history!: string;
  @Prop({ trim: true })
  objective!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

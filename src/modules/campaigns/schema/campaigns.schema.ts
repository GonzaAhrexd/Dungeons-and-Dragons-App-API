import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { User } from '@/modules/auth/schema/user.schema';

export type CampaignDocument = HydratedDocument<Campaign & Document>;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true, trim: true })
  name!: string;
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  gamemaster!: Types.ObjectId;

  @Prop({ trim: true })
  players!: string[];
  createdAt!: Date;
  updatedAt!: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);

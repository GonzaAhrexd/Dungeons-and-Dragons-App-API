import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({ timestamps: true })
export class Invitation {
  @Prop({ required: true, trim: true })
  campaignId!: string;

  @Prop({ required: true, trim: true })
  invitatedId!: string;
  @Prop({ required: true, default: 'pending' })
  state!: 'pending' | 'accepted' | 'rejected' | 'declined';

  @Prop({ required: true })
  sendedByGamemaster!: boolean;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

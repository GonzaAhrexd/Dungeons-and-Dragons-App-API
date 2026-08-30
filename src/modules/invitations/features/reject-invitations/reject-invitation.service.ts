import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Campaign,
  CampaignDocument,
} from '@/modules/campaigns/schema/campaigns.schema';
import { User, UserDocument } from '@/modules/auth/schema/user.schema';
import {
  Invitation,
  InvitationDocument,
} from '../../schema/invitations.schema';
import type { RejectInvitationResponse } from './interfaces/rejectInvitationResponse';

@Injectable()
export class RejectInvitationService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(
    invitationId: string,
    userId: string,
  ): Promise<RejectInvitationResponse> {
    const invitation = await this.invitationModel
      .findById(invitationId)
      .lean()
      .exec();

    if (!invitation || invitation.state !== 'pending') {
      throw new BadRequestException('Invitation not found or already handled');
    }

    if (invitation.invitatedId !== userId) {
      throw new BadRequestException(
        'Only the invited user can reject this invitation',
      );
    }

    await this.invitationModel.findByIdAndUpdate(
      invitationId,
      { state: 'rejected' },
      { returnDocument: 'after' },
    );

    return {
      id: invitation._id.toString(),
      campaignId: invitation.campaignId,
    };
  }
}

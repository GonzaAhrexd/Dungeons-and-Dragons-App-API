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
import type { CancelInvitationResponse } from './interfaces/cancelInvitationResponse';

@Injectable()
export class CancelInvitationService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(
    invitationId: string,
    userId: string,
  ): Promise<CancelInvitationResponse> {
    const invitation = await this.invitationModel
      .findById(invitationId)
      .lean()
      .exec();

    if (!invitation || invitation.state !== 'pending') {
      throw new BadRequestException('Invitation not found or already handled');
    }

    const campaign = await this.campaignModel.findById(invitation.campaignId);

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    if (campaign.gamemaster.toString() === userId) {
      await this.invitationModel.deleteOne({ _id: invitationId });

      await this.campaignModel.findByIdAndUpdate(
        invitation.campaignId,
        { $addToSet: { players: userId } },
        { returnDocument: 'after' },
      );

      return {
        id: invitation._id.toString(),
        campaignId: invitation.campaignId,
      };
    } else {
      throw new BadRequestException(
        'Only the gamemaster can cancel the invitation',
      );
    }
  }
}

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
import type { GetInvitationResponse } from './interfaces/acceptInvitationResponse';

@Injectable()
export class AcceptInvitationService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(
    invitationId: string,
    userId: string,
  ): Promise<GetInvitationResponse> {
    const invitation = await this.invitationModel
      .findOne({
        _id: invitationId,
        invitatedId: userId,
        state: 'pending',
      })
      .lean()
      .exec();

    if (!invitation) {
      throw new BadRequestException('Invitation not found or already handled');
    }

    const campaign = await this.campaignModel.findByIdAndUpdate(
      invitation.campaignId,
      { $addToSet: { players: userId } },
      { new: true },
    );

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    await this.invitationModel.findByIdAndUpdate(invitationId, {
      state: 'accepted',
    });

    return {
      id: invitation._id.toString(),
      campaignId: invitation.campaignId,
    };
  }
}

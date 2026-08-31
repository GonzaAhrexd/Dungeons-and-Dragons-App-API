import { Injectable } from '@nestjs/common';
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
import type { GetInvitationResponse } from './interfaces/getInvitationResponse';

@Injectable()
export class GetInvitationService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(invitatedId: string): Promise<GetInvitationResponse[]> {
    const invitations = await this.invitationModel
      .find({ invitatedId, state: 'pending' })
      .select('campaignId')
      .lean();

    if (!invitations.length) return [];

    const campaignIds = [...new Set(invitations.map((inv) => inv.campaignId))];

    const campaigns = await this.campaignModel
      .find({ _id: { $in: campaignIds } })
      .select('name gamemaster')
      .lean();

    const campaignById = new Map(
      campaigns.map((campaign) => [String(campaign._id), campaign]),
    );

    const gamemasterIds = [
      ...new Set(campaigns.map((campaign) => String(campaign.gamemaster))),
    ];

    const gamemasters = await this.userModel
      .find({ _id: { $in: gamemasterIds } })
      .select('username')
      .lean();

    const gamemasterById = new Map(
      gamemasters.map((user) => [String(user._id), user.username]),
    );

    return invitations.map((invitation) => {
      const campaign = campaignById.get(String(invitation.campaignId));
      const gamemasterId = campaign?.gamemaster
        ? String(campaign.gamemaster)
        : '';

      return {
        id: String(invitation._id),
        campaignId: invitation.campaignId,
        campaignName: campaign?.name ?? '',
        gamemasterUsername: gamemasterById.get(gamemasterId) ?? '',
      };
    });
  }
}

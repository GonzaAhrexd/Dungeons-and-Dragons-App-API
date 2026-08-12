import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from '../../schema/campaigns.schema';
import { User, UserDocument } from '@/modules/auth/schema/user.schema';
import {
  Invitation,
  InvitationDocument,
} from '@/modules/invitations/schema/invitations.schema';
import { GetCampaignByIdResponse } from './interfaces/getCampaignByIdResponse';

@Injectable()
export class GetCampaignByIdService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(
    campaignId: string,
    userId: string,
  ): Promise<GetCampaignByIdResponse> {
    const campaign = await this.campaignModel
      .findById(campaignId, { _id: 1, name: 1, description: 1, gamemaster: 1 })
      .lean<{
        _id: { toString(): string };
        name: string;
        description: string;
        gamemaster: { toString(): string } | string;
      }>()
      .exec();

    if (!campaign) throw new NotFoundException('Campaign not found');

    const invitations = await this.invitationModel
      .find({ campaignId }, { _id: 1, invitatedId: 1, state: 1 })
      .lean<
        Array<{
          _id: { toString(): string };
          invitatedId: string;
          state: 'pending' | 'accepted' | 'declined';
        }>
      >()
      .exec();

    const invitedUserIds = invitations
      .map((inv) => inv.invitatedId)
      .filter((value) => value && value.length === 24)
      .map((value) => value.toString());

    const invitedUsers = invitedUserIds.length
      ? await this.userModel
          .find({ _id: { $in: invitedUserIds } }, { _id: 1, username: 1 })
          .lean<Array<{ _id: { toString(): string }; username: string }>>()
          .exec()
      : [];

    const userById = new Map(
      invitedUsers.map((user) => [user._id.toString(), user.username]),
    );

    return {
      campaignId: campaign._id.toString(),
      name: campaign.name,
      description: campaign.description,
      isGameMaster: campaign.gamemaster.toString() === userId,
      invitations: invitations.map((inv) => ({
        invitationId: inv._id.toString(),
        username: userById.get(inv.invitatedId.toString()) ?? inv.invitatedId,
        state: inv.state,
      })),
    };
  }
}

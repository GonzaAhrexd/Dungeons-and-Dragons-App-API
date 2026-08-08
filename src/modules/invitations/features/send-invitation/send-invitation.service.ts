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
import { SendInvitationDto } from './send-invitation.dto';
import type { SendInvitationResponse } from './interfaces/sendInvitationResponse';

@Injectable()
export class SendInvitationService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Invitation.name)
    private invitationModel: Model<InvitationDocument>,
  ) {}

  async execute(
    dto: SendInvitationDto,
    gamemasterId: string,
  ): Promise<SendInvitationResponse> {
    const [campaign, invitatedUser] = await Promise.all([
      this.campaignModel.findById(dto.campaignId),
      this.userModel.findOne({ username: dto.username }),
    ]);

    if (!campaign) throw new BadRequestException('Campaign not found');
    if (campaign.gamemaster.toString() !== gamemasterId)
      throw new BadRequestException('Only the gamemaster can send invitations');
    if (!invitatedUser) throw new BadRequestException('User not found');

    const alreadyInvited = await this.invitationModel.exists({
      campaignId: dto.campaignId,
      invitatedId: invitatedUser.id,
    });
    if (alreadyInvited)
      throw new BadRequestException('Invitation already sent');

    const invitation = await this.invitationModel.create({
      campaignId: dto.campaignId,
      invitatedId: invitatedUser.id,
      sendedByGamemaster: true,
    });

    return invitation.toObject();
  }
}

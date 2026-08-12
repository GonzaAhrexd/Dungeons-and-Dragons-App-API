export interface GetCampaignByIdResponse {
  campaignId: string;
  name: string;
  description: string;
  isGameMaster: boolean;
  invitations: Array<{
    invitationId: string;
    username: string;
    state: 'pending' | 'accepted' | 'declined';
  }>;
}

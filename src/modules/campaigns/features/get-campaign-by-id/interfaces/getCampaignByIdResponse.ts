export interface Invitations {
  invitationId: string;
  username: string;
  state: 'pending' | 'accepted' | 'declined';
}
export interface Players {
  playerId: string;
  username: string;
}
export interface GetCampaignByIdResponse {
  campaignId: string;
  name: string;
  description: string;
  isGameMaster: boolean;
  invitations: Invitations[];
  players: Players[];
}

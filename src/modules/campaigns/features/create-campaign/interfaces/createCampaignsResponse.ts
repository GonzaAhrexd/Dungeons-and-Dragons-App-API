export interface CreateCampaignResponse {
  id: string;
  name: string;
  gamemaster: string;
  players: string[];
  createdAt: Date;
  updatedAt: Date;
}

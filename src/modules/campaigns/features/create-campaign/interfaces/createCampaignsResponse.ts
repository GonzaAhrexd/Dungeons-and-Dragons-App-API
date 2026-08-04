export interface CreateCampaignResponse {
  id: string;
  name: string;
  description: string;
  gamemaster: string;
  players: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EditCampaignResponse {
  id: string;
  name: string;
  description: string;
  gamemaster: string;
  players: string[];
  createdAt: Date;
  updatedAt: Date;
}

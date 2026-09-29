export interface EditCampaignResponse {
  id: string;
  name: string;
  description: string;
  gamemaster: string;
  isActive: boolean;
  players: string[];
  createdAt: Date;
  updatedAt: Date;
}

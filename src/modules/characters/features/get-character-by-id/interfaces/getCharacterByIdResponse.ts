export interface GetCharacterByIdResponse {
  id: string;
  userId: string;
  campaignId?: string;
  name: string;
  race?: string;
  class?: string;
  subclass?: string;
  alignment?: string;
  level: number;
  bars: {
    name: string;
    total: number;
    actual: number;
    color: string;
  }[];
  currentState?: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  inventory: {
    name: string;
    notes: string;
    quantity: number;
  }[];
  equipment: {
    icon: string;
    name: string;
    description: string;
  }[];
  backstory?: string;
  objective?: string;
  createdAt: Date;
  updatedAt: Date;
}

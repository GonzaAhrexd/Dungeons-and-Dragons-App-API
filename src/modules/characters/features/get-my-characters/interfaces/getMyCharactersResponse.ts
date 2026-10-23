export interface GetMyCharactersResponse {
  id: string;
  userId: string;
  name: string;
  race: string;
  class: string;
  subclass: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

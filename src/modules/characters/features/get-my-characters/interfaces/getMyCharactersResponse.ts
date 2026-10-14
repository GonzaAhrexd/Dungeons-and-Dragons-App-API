export interface GetMyCharactersResponse {
  id: string;
  userId: string;
  name: string;
  race: string;
  class: string;
  subclass: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

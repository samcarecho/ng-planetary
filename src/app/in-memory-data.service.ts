import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const planets = [
      { id: 11, name: 'Trantor', votes: 5 },
      { id: 12, name: 'Vega', votes: 3 },
      { id: 13, name: 'Synnax', votes: 2 },
      { id: 14, name: 'Mnemon', votes: 0 },
      { id: 15, name: 'Hesperos', votes: 0 },
      { id: 16, name: 'Helicon', votes: 2 },
      { id: 17, name: 'Eos', votes: 0 },
      { id: 18, name: 'Alpha', votes: 1 },
      { id: 19, name: 'Gaia', votes: 3 },
      { id: 20, name: 'Libair', votes: 0 }
    ];
    return {planets};
  }
}

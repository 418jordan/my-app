import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1,  name: 'Take out trash' },
      { id: 2, name: 'Do the dishes' },
      { id: 3, name: 'Weed the garden' },
      { id: 4, name: 'Get dinner ready' },
      { id: 5, name: 'Sweep the floor' },
      { id: 6, name: 'Do homework' },
      { id: 7, name: 'Get the oil changed' },
      { id: 8, name: 'Rotate the tires' },
      { id: 9, name: 'Mow the lawn' },
      { id: 10, name: 'Prune the trees' },
      { id: 11, name: 'Help in-laws' }
    ];
    return {tasks};
  }
}

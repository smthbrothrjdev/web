
import { EventEnv } from './EventEnv';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  public events: EventEnv = new EventEnv();

  constructor(private data: UserProps) {}

  functionRepo = {};
  // basic property state getSet
  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }



 
}

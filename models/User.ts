import { ObjectFlags } from 'typescript';
import axios, { AxiosResponse } from 'axios';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  functionRepo = {};
  // basic property state getSet
  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  // basic event handler framework

  on(eventName: string, callback: Callback): void {
    const eventArray = this.events[eventName] || [];
    eventArray.push(callback);
    this.events[eventName] = eventArray;
  }

  trigger(eventName: string): void {
    const eventArray = this.events[eventName];
    if (!eventArray || eventArray.length === 0) {
      return;
    }

    for (let i = 0; i < eventArray.length; i++) {
      eventArray[i]();
    }
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      });
  }

  save(): void {
    const targetId = this.get('id');
    if (targetId) {
      axios.patch(`http://localhost:3000/users/${targetId}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}

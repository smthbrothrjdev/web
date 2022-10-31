import { EventEnv } from './EventEnv';
//import { User, UserProps } from "./User";
import axios, { AxiosResponse } from 'axios';

//T = model k= model props
export class Collection<T, K> {
  models: T[] = [];
  events: EventEnv = new EventEnv();

  constructor(public rootURL: string, public deserial: (json: K) => T) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootURL).then((res: AxiosResponse) => {
      res.data.forEach((element: K) => {
        this.models.push(this.deserial(element));
      });
      this.trigger('change');
    });
  }
}

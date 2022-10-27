interface UserProps {
  name?: string;
  age?: number;
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
    
    const eventArray = this.events[eventName] || []
    eventArray.push(callback);
    this.events[eventName] = eventArray
    
  }

  trigger(eventName: string): void {}
}

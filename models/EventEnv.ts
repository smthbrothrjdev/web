type Callback = () => void;

export class EventEnv {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const eventArray = this.events[eventName] || [];
    eventArray.push(callback);
    this.events[eventName] = eventArray;
  };

  trigger = (eventName: string): void => {
    const eventArray = this.events[eventName];
    if (!eventArray || eventArray.length === 0) {
      return;
    }

    for (let i = 0; i < eventArray.length; i++) {
      eventArray[i]();
    }
  };
}

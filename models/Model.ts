import { AxiosPromise, AxiosResponse } from "axios";

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelProps<T> {
  set(value: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface containsId {
  id?: number;
}

export class Model<T extends containsId> {
  constructor(
    private props: ModelProps<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get = this.props.get;

  //this will also trigger a event lister of 'change' to notify
  // all subscribers to this instance know there is a change
  set(update: T) {
    this.props.set(update);
    this.events.trigger("change");
  }

  on = this.events.on;
  trigger = this.events.trigger;

  fetch(): void {
    const id = this.get("id");

    if (typeof id === "number") {
      this.sync.fetch(id).then((res: AxiosResponse): void => {
        this.set(res.data);
      });
    } else {
      throw new Error("Fetch aborted, item is not in database!");
    }
  }

  save(): void {
    this.sync
      .save(this.props.getAll())
      .then((res: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}

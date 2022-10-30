import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { EventEnv } from "./EventEnv";
import { NetIO } from "./NetIO";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  public events: EventEnv = new EventEnv();
  public sync: NetIO<UserProps> = new NetIO<UserProps>(rootUrl);
  public props: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.props = new Attributes<UserProps>(attrs);
  }

  get get() {
    return this.props.get;
  }

  //this will also trigger a event lister of 'change' to notify
  // all subscribers to this instance know there is a change
  set(update: UserProps) {
    this.props.set(update);
    this.events.trigger("change");
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

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

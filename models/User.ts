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
}

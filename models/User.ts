import { Attributes } from "./Attributes";
import { NetIO } from "./NetIO";
import { EventEnv } from "./EventEnv";
import { Model } from "./Model";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new EventEnv(),
      new NetIO<UserProps>(rootUrl)
    );
  }
}

import { Attributes } from './Attributes';
import { NetIO } from './NetIO';
import { EventEnv } from './EventEnv';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export type TUser = Collection<User, UserProps>;

const rootUrl = 'http://localhost:8080/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new EventEnv(),
      new NetIO<UserProps>(rootUrl)
    );
  }
  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  ///strict example class

  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}

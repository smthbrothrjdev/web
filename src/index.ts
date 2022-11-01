import { Collection } from '../models/Collection';
import { UserList } from '../views/UserList';
import { User, UserProps } from '../models/User';
import { UserEdit } from '../views/UserEdit';

new UserEdit(
  document.getElementById('root')!,
  User.buildUser({ name: 'BJ', age: 70 })
).render();

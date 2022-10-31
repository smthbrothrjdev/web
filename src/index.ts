import { UserForm } from '../views/UserForm';
import { User } from '../models/User';

const u = new UserForm(
  document.getElementById('root')!,
  User.buildUser({ name: 'BJ', age: 36 })
);

u.render();

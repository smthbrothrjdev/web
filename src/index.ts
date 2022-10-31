import { User } from '../models/User';

const a = User.buildCollection();

a.on('change', () => {
  console.log('loaded data');
});

a.fetch();

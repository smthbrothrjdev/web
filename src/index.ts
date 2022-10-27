import { User } from '../models/User';

const user = new User({id: 1 });

user.fetch();

// user.set({name: 'new', age:10})
// user.save()
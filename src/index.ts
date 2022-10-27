import { User } from '../models/User';

const user = new User({ name: 'y', age: 3 });

user.on('click', ()=>{
  console.log("hi")
})
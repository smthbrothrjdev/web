import { Collection } from "../models/Collection";
import { User, UserProps } from "../models/User";

const a = new Collection<User, UserProps>(
  "http://localhost:3000/users",
  (json: UserProps) => User.buildUser(json)
);

a.on("change", () => {
  console.log("loaded data");
});

a.fetch();

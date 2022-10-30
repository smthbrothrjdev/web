import { userInfo } from "os";
import { User } from "../models/User";

const user = User.buildUser({});

user.get("id");

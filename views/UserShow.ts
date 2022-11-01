import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
        <h1> User Detail</h1>
        <h3> ${this.model.get("name")}</h3>
        <h3> ${this.model.get("age")}
        `;
  }
}

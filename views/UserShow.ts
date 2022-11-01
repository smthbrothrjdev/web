import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
       <div class="user-show">
        <h3> name: ${this.model.get("name")}</h3>
        <h3> age:  ${this.model.get("age")}
        </div>
       <br/>
    
        `;
  }
}

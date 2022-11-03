import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div  class='bg-secondary bg-gradient m-1 card text-center' style="width: 18rem; --bs-bg-opacity: .3;" >
       <div class="user-show card-body">
        <h3> name: ${this.model.get("name")}</h3>
        <h3> age:  ${this.model.get("age")}
        </div>
       <br/>
    </div>
        `;
  }
}

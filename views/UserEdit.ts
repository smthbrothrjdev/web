import { User, UserProps } from "../models/User";
import { View } from "./View";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { UserList } from "./UserList";
import { Collection } from "../models/Collection";

export class UserEdit extends View<User, UserProps> {
  //overide nested views

  regionsMap(): { [keys: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
      userList: ".user-list",
    };
  }

  //todo automate this
  onRender(): void {
    //for collection
    let users = User.buildCollection();
    //add change method needed for collectionview as well as the fetch below
    users.on("change", () => {
      const parentElement = this.regions.userList;
      if (parentElement) {
        new UserList(parentElement, users).render();
      }
    });
    users.fetch();

    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
    new UserList(this.regions.userList, User.buildCollection()).render();
  }

  template(): string {
    return `
        <div class="row">
            <div class="user-show col-md-8 offset-md-5"></div>
            <div class="p-4 mr-4 user-form col-md-8 offset-md-4"></div>
           
            <hr />
            <div class="user-list col-md-8 offset-md-5"></div>
        </div>
        `;
  }
}

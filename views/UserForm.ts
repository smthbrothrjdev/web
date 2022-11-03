import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.randomAge": this.onSetAgeClick,
      "click:.setName": this.onSetNameClick,
      "click:.saveButton": this.saveUser,
    };
  }

  saveUser = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
    <div>
    <input class='p-2' type='text' placeholder="${this.model.get("name")}"/>
    <button class='setName btn btn-primary'>update name</button>
    <button class='randomAge btn btn-primary'> set random age </button>
    <button class='saveButton btn btn-primary'> save </button>
    </div>`;
  }
}

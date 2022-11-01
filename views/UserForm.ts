import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.randomAge": this.onSetAgeClick,
      "click:.setName": this.onSetNameClick,
    };
  }

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
    <h1> Name: ${this.model.get("name")}  </h1>
    <h1> Age: ${this.model.get("age")} </h1>
    <input type='text'/>
    <button class='setName'>update name</button>
    <button class='randomAge'> set random age </button>
    </div>`;
  }
}

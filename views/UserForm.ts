import { User } from '../models/User';
export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.randomAge': this.onSetAgeClick,
      'click:.setName': this.onSetNameClick,
    };
  }

  eventBinder(fragment: DocumentFragment) {
    const mappedEvents = this.eventsMap();
    for (let key in mappedEvents) {
      const [eventName, eventTarget] = key.split(':');
      fragment.querySelectorAll(eventTarget).forEach((element) => {
        element.addEventListener(eventName, mappedEvents[key]);
      });
    }
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
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
    <h1> Name: ${this.model.get('name')}  </h1>
    <h1> Age: ${this.model.get('age')} </h1>
    <input type='text'/>
    <button class='setName'>update name</button>
    <button class='randomAge'> set random age </button>
    </div>`;
  }

  render(): void {
    this.parent.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.eventBinder(template.content);
    this.parent.append(template.content);
  }
}

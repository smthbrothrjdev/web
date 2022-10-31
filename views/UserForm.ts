import { User } from '../models/User';
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.randomAge': this.onSetAgeClick,
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

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
    this.render();
  };

  template(): string {
    return `
    <div>
    <h1> ${this.model.get('name')}  </h1>
    <h1> ${this.model.get('age')} </h1>
    <input />
    <button id='button'>hello</button>
    <button class='randomAge'> set random age </button>
    </div>`;
  }

  render(): void {
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.eventBinder(template.content);
    this.parent.append(template.content);
  }
}

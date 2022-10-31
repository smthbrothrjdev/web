export class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onH1Hover,
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

  onH1Hover() {
    console.log('hoevereed!!!');
  }

  onButtonClick(): void {
    console.log('clickesd!!');
  }

  template(): string {
    return `
    <div>
    <h1> Hi </h1>
    <input />
    <button id='button'>hello</button>
    </div>`;
  }

  render(): void {
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.eventBinder(template.content);
    this.parent.append(template.content);
  }

  render2(s: string): void {
    const template = document.createElement('template');
    template.innerHTML = s;

    this.parent.append(template.content);
  }
}

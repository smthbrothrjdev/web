import { Model } from "../models/Model";
import { containsId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends containsId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  eventBinder(fragment: DocumentFragment) {
    const mappedEvents = this.eventsMap();
    for (let key in mappedEvents) {
      const [eventName, eventTarget] = key.split(":");
      fragment.querySelectorAll(eventTarget).forEach((element) => {
        element.addEventListener(eventName, mappedEvents[key]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    this.eventBinder(template.content);
    this.parent.append(template.content);
  }
}

import { Model } from "../models/Model";
import { containsId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends containsId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  //the next two need to implemented by user for now
  //regions map is for nested views
  //eventsmap is for event listeners

  regionsMap(): { [keys: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  //TODO automate
  //IMPLEMENTED IN VIEW SUBCLASS
  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();

    this.eventBinder(template.content);
    this.mapRegions(template.content);

    this.onRender();

    this.parent.append(template.content);
  }
}

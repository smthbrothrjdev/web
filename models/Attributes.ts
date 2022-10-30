import { UserProps } from "./User";

export class Attributes<T extends {}> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}

const attrs = new Attributes({ name: "hello", age: 23, sex: "M" });

const b = attrs.get("age");

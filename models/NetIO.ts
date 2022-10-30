import axios, { AxiosPromise, AxiosResponse } from "axios";
//import { UserProps } from "./User";

interface ContainsId {
  id?: number;
}
export class NetIO<T extends ContainsId> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.patch(`${this.rootURL}/${id}`, data);
    } else {
      return axios.post(this.rootURL, data);
    }
  }
}

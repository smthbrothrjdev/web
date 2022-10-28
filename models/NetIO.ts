 import axios, {AxiosResponse} from 'axios'
 
 export class NetworkIO  {
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      });
  }

  save(): void {
    const targetId = this.get('id');
    if (targetId) {
      axios.patch(`http://localhost:3000/users/${targetId}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
 }  
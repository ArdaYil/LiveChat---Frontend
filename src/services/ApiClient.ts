import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
});

class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async get(): Promise<T> {
    return axios.get<T>(this.endpoint).then((res) => res.data);
  }

  public async post(message: T) {
    axios.post<T>(this.endpoint);
  }
}

export default ApiClient;

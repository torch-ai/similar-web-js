import { AxiosInstance } from "axios";

export default abstract class Component {
  protected client: AxiosInstance;

  public constructor(client: AxiosInstance) {
    this.client = client;
  }
}

import Component from "../Component";
import { ICapabilities } from "./Utilities.types";

export class Utilities extends Component {
  public capabilities(): Promise<ICapabilities> {
    return this.client
      .get<ICapabilities>("capabilities")
      .then((response) => response.data);
  }
}

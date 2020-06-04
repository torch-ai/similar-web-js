import Component from "../Component";
import { ICapabilities, ICategories } from "./Utilities.types";

export class Utilities extends Component {
  public capabilities(): Promise<ICapabilities> {
    return this.client
      .get<ICapabilities>("capabilities")
      .then((response) => response.data);
  }

  public categories(): Promise<ICategories> {
    return this.client
      .get<ICategories>("v1/TopSites/categories")
      .then((response) => response.data);
  }
}

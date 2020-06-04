import Component from "../Component";
import { ITechnographics, ITechnographicsParams } from "./SalesSolution.types";

/**
 * The endpoints below are only accessible to our clients who subscribed to the Similarweb Sales Solution
 */
export class SalesSolution extends Component {
  /**
   * Returns the currently installed technologies (updated weekly on Sundays).
   */
  public technographics(
    domain: string,
    options: ITechnographicsParams = {}
  ): Promise<ITechnographics> {
    return this.client
      .get<ITechnographics>(`v1/website/${domain}/technographics/all`, {
        params: options,
      })
      .then((response) => response.data);
  }
}

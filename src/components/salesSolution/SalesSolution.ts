import Component from "../Component";
import {
  ILeadEnrichment,
  ILeadEnrichmentParams,
  ITechnographics,
  ITechnographicsParams,
} from "./SalesSolution.types";

/**
 * The endpoints below are only accessible to our clients who subscribed to the Similarweb Sales Solution
 */
export class SalesSolution extends Component {
  /**
   * Returns the a dataset for Worldwide.
   * Returns the a dataset for the selected country with Monthly granularity for the specified time frame, up to last 12 months:
   */
  public leadEnrichment(
    domain: string,
    options: ILeadEnrichmentParams
  ): Promise<ILeadEnrichment> {
    return this.client
      .get<ILeadEnrichment>(`v1/website/${domain}/lead-enrichment/all`, {
        params: options,
      })
      .then((response) => response.data);
  }

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

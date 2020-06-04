import Component from "../Component";
import { ISimilarSites, ISimilarSitesParams } from "./DesktopOther.types";

export class DesktopOther extends Component {
  /**
   * Returns the top 40 most similar websites to the given domain & their similarity score
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public similarSites(
    domain: string,
    options: ISimilarSitesParams = {}
  ): Promise<ISimilarSites> {
    return this.client
      .get<ISimilarSites>(`v1/website/${domain}/similar-sites/similarsites`, {
        params: options,
      })
      .then((response) => response.data);
  }
}

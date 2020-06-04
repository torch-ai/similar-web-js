import Component from "../Component";
import {
  IDesktopOtherAudienceInterests,
  IDesktopOtherAudienceInterestsParams,
  IDesktopOtherSimilarSites,
  IDesktopOtherSimilarSitesParams,
} from "./DesktopOther.types";

export class DesktopOther extends Component {
  /**
   * Returns the top 40 most similar websites to the given domain & their similarity score
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public similarSites(
    domain: string,
    options: IDesktopOtherSimilarSitesParams = {}
  ): Promise<IDesktopOtherSimilarSites> {
    return this.client
      .get<IDesktopOtherSimilarSites>(
        `v1/website/${domain}/similar-sites/similarsites`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns a list of additional websites that were frequently visited by the same visitors of a given
   * domain within the browsing session, along with their affinity score and overlap (average % of visitors that
   * visited both sites on the same day).
   */
  public audienceInterests(
    domain: string,
    options: IDesktopOtherAudienceInterestsParams
  ): Promise<IDesktopOtherAudienceInterests> {
    return this.client
      .get<IDesktopOtherAudienceInterests>(
        `v1/website/${domain}/audience-interests/also-visited`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

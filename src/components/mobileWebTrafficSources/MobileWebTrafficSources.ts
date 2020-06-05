import Component from "../Component";
import {
  IMobileWebTrafficSourcesOverviewShare,
  IMobileWebTrafficSourcesOverviewShareParams,
} from "./MobileWebTrafficSources.types";

export class MobileWebTrafficSources extends Component {
  /**
   * Returns estimated Mobile Web traffic volume by source.
   *
   * Please note the Mobile Web Traffic Sources doesn't support the distinction between organic and paid search;
   * the endpoint will return search visits which is an aggregate of organic and paid.
   */
  public overviewShare(
    domain: string,
    options: IMobileWebTrafficSourcesOverviewShareParams
  ): Promise<IMobileWebTrafficSourcesOverviewShare> {
    return this.client
      .get<IMobileWebTrafficSourcesOverviewShare>(
        `v1/website/${domain}/traffic-sources/mobile-overview-share`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

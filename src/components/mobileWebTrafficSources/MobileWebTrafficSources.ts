import Component from "../Component";
import {
  IMobileWebTrafficSourcesOverviewShare,
  IMobileWebTrafficSourcesOverviewShareParams,
  IMobileWebTrafficSourcesReferrals,
  IMobileWebTrafficSourcesReferralsParams,
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

  /**
   * Returns the mobile referring websites for the given domain, and traffic share per referrer
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL and set
   * granularity to daily or weekly
   */
  public referrals(
    domain: string,
    options: IMobileWebTrafficSourcesReferralsParams
  ): Promise<IMobileWebTrafficSourcesReferrals> {
    return this.client
      .get<IMobileWebTrafficSourcesReferrals>(
        `v1/website/${domain}/traffic-sources/mobileweb-referrals`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

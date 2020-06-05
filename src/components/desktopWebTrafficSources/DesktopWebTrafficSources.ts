import Component from "../Component";
import {
  IDesktopWebTrafficSourcesEngagementMetricsParams,
  IDesktopWebTrafficSourcesOverview,
  IDesktopWebTrafficSourcesOverviewParams,
  IDesktopWebTrafficSourcesOverviewShare,
  IDesktopWebTrafficSourcesOverviewShareParams,
  IDesktopWebTrafficSourcesEngagementMetrics,
  IDesktopWebTrafficSourcesReferralsParams,
  IDesktopWebTrafficSourcesSocialReferrals,
} from "./DesktopWebTrafficSources.types";

export class DesktopWebTrafficSources extends Component {
  /**
   * Returns a detailed overview of traffic sources broken down by source type and
   * traffic share for the selected time period
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public overview(
    domain: string,
    options: IDesktopWebTrafficSourcesOverviewParams
  ): Promise<IDesktopWebTrafficSourcesOverview> {
    return this.client
      .get<IDesktopWebTrafficSourcesOverview>(
        `v1/website/${domain}/traffic-sources/overview`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns estimated desktop traffic volume by source
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public overviewShare(
    domain: string,
    options: IDesktopWebTrafficSourcesOverviewShareParams
  ): Promise<IDesktopWebTrafficSourcesOverviewShare> {
    return this.client
      .get<IDesktopWebTrafficSourcesOverviewShare>(
        `v1/website/${domain}/traffic-sources/overview-share`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns estimated pages per visit by source on Desktop
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public pagesPerVisit(
    domain: string,
    options: IDesktopWebTrafficSourcesEngagementMetricsParams
  ): Promise<IDesktopWebTrafficSourcesEngagementMetrics> {
    return this.client
      .get<IDesktopWebTrafficSourcesEngagementMetrics>(
        `v1/website/${domain}/traffic-sources/engagement-metrics/pages-per-visit`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns estimated average visit duration by source on Desktop
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public averageVisitDuration(
    domain: string,
    options: IDesktopWebTrafficSourcesEngagementMetricsParams
  ): Promise<IDesktopWebTrafficSourcesEngagementMetrics> {
    return this.client
      .get<IDesktopWebTrafficSourcesEngagementMetrics>(
        `v1/website/${domain}/traffic-sources/engagement-metrics/average-duration`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns estimated bounce rate by source on Desktop
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public bounceRate(
    domain: string,
    options: IDesktopWebTrafficSourcesEngagementMetricsParams
  ): Promise<IDesktopWebTrafficSourcesEngagementMetrics> {
    return this.client
      .get<IDesktopWebTrafficSourcesEngagementMetrics>(
        `v1/website/${domain}/traffic-sources/engagement-metrics/bounce-rate`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the leading social networks sending traffic to a given domain as well as traffic
   * share per social network and # of social visits
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public socialReferrals(
    domain: string,
    options: IDesktopWebTrafficSourcesReferralsParams
  ): Promise<IDesktopWebTrafficSourcesSocialReferrals> {
    return this.client
      .get<IDesktopWebTrafficSourcesSocialReferrals>(
        `v1/website/${domain}/traffic-sources/social`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

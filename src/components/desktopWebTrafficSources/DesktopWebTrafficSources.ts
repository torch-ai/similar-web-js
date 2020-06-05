import Component from "../Component";
import {
  IDesktopWebTrafficSourcesEngagementMetricParams,
  IDesktopWebTrafficSourcesOverview,
  IDesktopWebTrafficSourcesOverviewParams,
  IDesktopWebTrafficSourcesOverviewShare,
  IDesktopWebTrafficSourcesOverviewShareParams,
  IDesktopWebTrafficSourcesPagesPerVisit,
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
    options: IDesktopWebTrafficSourcesEngagementMetricParams
  ): Promise<IDesktopWebTrafficSourcesPagesPerVisit> {
    return this.client
      .get<IDesktopWebTrafficSourcesPagesPerVisit>(
        `v1/website/${domain}/traffic-sources/engagement-metrics/pages-per-visit`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

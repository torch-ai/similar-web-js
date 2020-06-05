import Component from "../Component";
import {
  IDesktopWebTrafficSourcesOverview,
  IDesktopWebTrafficSourcesOverviewParams,
  IDesktopWebTrafficSourcesOverviewShare,
  IDesktopWebTrafficSourcesOverviewShareParams,
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
}

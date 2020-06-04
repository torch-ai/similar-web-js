import Component from "../Component";
import {
  ITotalTrafficPagesVisits,
  ITotalTrafficVisits,
  ITotalTrafficVisitsParams,
} from "./TotalTraffice.types";

export class TotalTraffic extends Component {
  /**
   * Returns estimated number of visits for the domain.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL and set granularity to daily or weekly
   */
  public visits(
    domain: string,
    options: ITotalTrafficVisitsParams
  ): Promise<ITotalTrafficVisits> {
    return this.client
      .get<ITotalTrafficVisits>(
        `v1/website/${domain}/total-traffic-and-engagement/visits`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the average page views per visit for the given domain.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL and set granularity to daily or weekly
   */
  public pagesVisits(
    domain: string,
    options: ITotalTrafficVisitsParams
  ): Promise<ITotalTrafficPagesVisits> {
    return this.client
      .get<ITotalTrafficPagesVisits>(
        `v1/website/${domain}/total-traffic-and-engagement/pages-per-visit`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

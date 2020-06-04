import Component from "../Component";
import {
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
}

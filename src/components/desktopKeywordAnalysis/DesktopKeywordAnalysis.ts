import Component from "../Component";
import {
  IDesktopKeywordAnalysisCompetitors,
  IDesktopKeywordAnalysisCompetitorsParams,
} from "./DesktopKeywordAnalysis.types";

export class DesktopKeywordAnalysis extends Component {
  /**
   * Returns a list of websites that are competing for the same organic keywords as the
   * given domain and competition score.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public competitorsOrganic(
    domain: string,
    options: IDesktopKeywordAnalysisCompetitorsParams
  ): Promise<IDesktopKeywordAnalysisCompetitors> {
    return this.client
      .get<IDesktopKeywordAnalysisCompetitors>(
        `v1/website/${domain}/search-competitors/organicsearchcompetitors`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns a list of websites that are competing for the same paid keywords as the
   * given domain and competition score.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public competitorsPaid(
    domain: string,
    options: IDesktopKeywordAnalysisCompetitorsParams
  ): Promise<IDesktopKeywordAnalysisCompetitors> {
    return this.client
      .get<IDesktopKeywordAnalysisCompetitors>(
        `v1/website/${domain}/search-competitors/paidsearchcompetitors`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

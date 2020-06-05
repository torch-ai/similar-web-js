import Component from "../Component";
import {
  IDesktopOtherApiLight,
  IDesktopOtherAudienceInterests,
  IDesktopOtherAudienceInterestsParams,
  IDesktopOtherCategoryRank,
  IDesktopOtherCategoryRankParams,
  IDesktopOtherSimilarSites,
  IDesktopOtherSimilarSitesParams,
  IDesktopOtherTopSites,
  IDesktopOtherTopSitesDescription,
  IDesktopOtherTopSitesParams,
} from "./DesktopOther.types";
import { SimilarWebError } from "../../Service.types";

export class DesktopOther extends Component {
  public static All = "$All";
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

  /**
   * Returns the Category of a given domain and its Global Rank within its given category.
   *
   * Category values can be found at https://api.similarweb.com/v1/TopSites/categories - replace “$All” with “${Category}”
   * Or are available through the utilities component of this package.
   */
  public categoryRank(
    domain: string,
    options: IDesktopOtherCategoryRankParams = {}
  ): Promise<IDesktopOtherCategoryRank> {
    return this.client
      .get<IDesktopOtherCategoryRank>(
        `v1/website/${domain}/category-rank/category-rank`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns top 100 sites for Desktop, in a given Category.
   *
   * Category can be either "$All" or "${Category}", where {Category} is one value from the list available here:
   * https://api.similarweb.com/v1/TopSites/categories.
   *
   * The start and end date have to be set as the previous month.
   * Must be set to the last month for which there is data, in the YYYY-MM format.
   * To retrieve this value you can use the Check Capabilities endpoint and get the value returned
   * in web_desktop_data/snapshot_interval/end_date
   */
  public async topSitesDesktop(
    category: typeof DesktopOther.All | string,
    options: IDesktopOtherTopSitesParams
  ): Promise<IDesktopOtherTopSites> {
    // The notes in the api docs suggest using capabilities, but the API responses suggest the describe end point
    const description = await this.client
      .get<IDesktopOtherTopSitesDescription>(
        `v1/website/${category}/topsites/describe`,
        {
          params: options,
        }
      )
      .then((response) => response.data);

    if (
      category !== DesktopOther.All &&
      description.response.categories.indexOf(category) === -1
    ) {
      throw new SimilarWebError(
        `No category data available for: ${category}`,
        0
      );
    }

    const dateRange =
      description.response.top_sites.countries[options.country] || undefined;
    if (!dateRange) {
      throw new SimilarWebError(
        `No country data available for: ${options.country}`,
        0
      );
    }

    return this.client
      .get<IDesktopOtherTopSites>(`v1/website/${category}/topsites/topsites`, {
        params: {
          ...options,
          ...dateRange,
        },
      })
      .then((response) => response.data);
  }

  /**
   * Returns top 100 sites for Mobile Web, in a given Category.
   *
   * Category can be either "$All" or "${Category}", where {Category} is one value from the list available here:
   * https://api.similarweb.com/v1/TopSites/categories.
   *
   * The start and end date have to be set as the previous month.
   * Must be set to the last month for which there is data, in the YYYY-MM format.
   * To retrieve this value you can use the Check Capabilities endpoint and get the value returned
   * in web_desktop_data/snapshot_interval/end_date
   */
  public async topSitesMobile(
    category: typeof DesktopOther.All | string,
    options: IDesktopOtherTopSitesParams
  ): Promise<IDesktopOtherTopSites> {
    // The notes in the api docs suggest using capabilities, but the API responses suggest the describe end point
    const description = await this.client
      .get<IDesktopOtherTopSitesDescription>(
        `v1/website/${category}/topsitesmobile/describe`,
        {
          params: options,
        }
      )
      .then((response) => response.data);

    if (
      category !== DesktopOther.All &&
      description.response.categories.indexOf(category) === -1
    ) {
      throw new SimilarWebError(
        `No category data available for: ${category}`,
        0
      );
    }

    const dateRange =
      description.response.top_sites.countries[options.country] || undefined;
    if (!dateRange) {
      throw new SimilarWebError(
        `No country data available for: ${options.country}`,
        0
      );
    }

    return this.client
      .get<IDesktopOtherTopSites>(
        `v1/website/${category}/topsitesmobile/topsites`,
        {
          params: {
            ...options,
            ...dateRange,
          },
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the exact data set as found in our Free tool for Worldwide data:
   */
  public apiLite(domain: string): Promise<IDesktopOtherApiLight> {
    return this.client
      .get<IDesktopOtherApiLight>(`v1/website/${domain}/general-data/all`)
      .then((response) => response.data);
  }
}

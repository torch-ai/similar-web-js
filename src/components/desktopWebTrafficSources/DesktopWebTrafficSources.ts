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
  IDesktopWebTrafficSourcesReferrals,
  IDesktopWebTrafficSourcesAdNetworks,
  IDesktopWebTrafficSourcesAdNetworksParams,
  IDesktopWebTrafficSourcesPublishers,
  IDesktopWebTrafficSourcesPublishersParams,
  IDesktopWebTrafficSourcesKeywordsParams,
  IDesktopWebTrafficSourcesKeywords,
  IDesktopWebTrafficSourcesSearchVisitDistribution,
  IDesktopWebTrafficSourcesSearchVisitDistributionParams,
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

  /**
   * Returns the referring websites for the given domain, and traffic share per referrer and # of referral visits
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public referrals(
    domain: string,
    options: IDesktopWebTrafficSourcesReferralsParams
  ): Promise<IDesktopWebTrafficSourcesReferrals> {
    return this.client
      .get<IDesktopWebTrafficSourcesReferrals>(
        `v1/website/${domain}/traffic-sources/referrals`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns leading Ad Networks sending traffic to a given domain as well as traffic share per Ad Network
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public adNetworks(
    domain: string,
    options: IDesktopWebTrafficSourcesAdNetworksParams
  ): Promise<IDesktopWebTrafficSourcesAdNetworks> {
    return this.client
      .get<IDesktopWebTrafficSourcesAdNetworks>(
        `v1/website/${domain}/traffic-sources/ad-networks`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns leading publishers sending traffic to a given domain as well as traffic share
   * per publisher and # of display visits
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public publishers(
    domain: string,
    options: IDesktopWebTrafficSourcesPublishersParams
  ): Promise<IDesktopWebTrafficSourcesPublishers> {
    return this.client
      .get<IDesktopWebTrafficSourcesPublishers>(
        `v1/website/${domain}/traffic-sources/publishers`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the organic keywords for the given domain, keyword traffic share, change %,
   * keyword volume, CPC, URL, and keyword position and # of organic visits on desktop.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public organicSearchKeywords(
    domain: string,
    options: IDesktopWebTrafficSourcesKeywordsParams
  ): Promise<IDesktopWebTrafficSourcesKeywords> {
    return this.client
      .get<IDesktopWebTrafficSourcesKeywords>(
        `v1/website/${domain}/traffic-sources/organic-search`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the organic keywords for the given domain, keyword traffic share, change %,
   * keyword volume, CPC, URL, and keyword position and # of paid visits on desktop.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public paidSearchKeywords(
    domain: string,
    options: IDesktopWebTrafficSourcesKeywordsParams
  ): Promise<IDesktopWebTrafficSourcesKeywords> {
    return this.client
      .get<IDesktopWebTrafficSourcesKeywords>(
        `v1/website/${domain}/traffic-sources/paid-search`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the branded keywords for the given domain, keyword traffic share, change %,
   * keyword volume, CPC, URL, and keyword position and # of branded visits on desktop.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public brandedKeywords(
    domain: string,
    options: IDesktopWebTrafficSourcesKeywordsParams
  ): Promise<IDesktopWebTrafficSourcesKeywords> {
    return this.client
      .get<IDesktopWebTrafficSourcesKeywords>(
        `v1/website/${domain}/traffic-sources/branded-search`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the non-branded keywords for the given domain, keyword traffic share, change %,
   * keyword volume, CPC, URL, and keyword position and # of non-branded visits on desktop.
   *
   * To retrieve Last 28 days remove the start_date & end_date parameters from the URL
   */
  public nonBrandedKeywords(
    domain: string,
    options: IDesktopWebTrafficSourcesKeywordsParams
  ): Promise<IDesktopWebTrafficSourcesKeywords> {
    return this.client
      .get<IDesktopWebTrafficSourcesKeywords>(
        `v1/website/${domain}/traffic-sources/nonbranded-search`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the monthly paid & branded search visits distribution for Desktop traffic.
   */
  public questionsKeywords(
    domain: string,
    options: IDesktopWebTrafficSourcesKeywordsParams
  ): Promise<IDesktopWebTrafficSourcesKeywords> {
    return this.client
      .get<IDesktopWebTrafficSourcesKeywords>(
        `v1/website/${domain}/traffic-sources/questions-search`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }

  /**
   * Returns the monthly paid & branded search visits distribution for Desktop traffic.
   */
  public searchVisitsDistribution(
    domain: string,
    options: IDesktopWebTrafficSourcesSearchVisitDistributionParams
  ): Promise<IDesktopWebTrafficSourcesSearchVisitDistribution> {
    return this.client
      .get<IDesktopWebTrafficSourcesSearchVisitDistribution>(
        `v1/website/${domain}/traffic-sources/search-visits-distribution`,
        {
          params: options,
        }
      )
      .then((response) => response.data);
  }
}

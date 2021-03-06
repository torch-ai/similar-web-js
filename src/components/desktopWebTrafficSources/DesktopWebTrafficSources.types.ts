import {
  IChange,
  ICountryParam,
  IDateGranularityParam,
  IDateRangeParams,
  IFormatParam,
  ILimitParam,
  IMainDomainOnlyParam,
  IMeta,
  IRankings,
} from "../Component.types";

export interface IDesktopWebTrafficSourcesOverviewParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesOverview
  extends IMeta<IDesktopWebTrafficSourcesOverviewParams> {
  overview: IDesktopWebTrafficSourcesOverviewItem[];
  visits: number; // 30706465
}

export interface IDesktopWebTrafficSourcesOverviewItem {
  domain: string; // "Direct";
  source_type: string; // "Direct";
  share: number; // 0.42014433929759787;
}

export interface IDesktopWebTrafficSourcesOverviewShareParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    IDateGranularityParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesOverviewShare
  extends IMeta<IDesktopWebTrafficSourcesOverviewShareParams> {
  visits: Record<string, IDesktopWebTrafficSourcesOverviewShareItem[]>;
}

export interface IDesktopWebTrafficSourcesOverviewShareItem {
  source_type: string; // "Search"
  visits: {
    date: string; // "2017-11-01"
    organic: number; // 1684411.973757629
    paid: number; // 5098.656956320019
  }[];
}

export interface IDesktopWebTrafficSourcesEngagementMetricsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    IDateGranularityParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesEngagementMetrics
  extends IMeta<IDesktopWebTrafficSourcesEngagementMetricsParams> {
  data: IDesktopWebTrafficSourcesEngagementMetricItem[];
}

export interface IDesktopWebTrafficSourcesEngagementMetricItem {
  source_type: string; // "Social"
  values: {
    date: string; // "2017-11-01"
    value: string; // 2.189143760425302
  }[];
}

export interface IDesktopWebTrafficSourcesReferralsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesSocialReferrals
  extends IMeta<IDesktopWebTrafficSourcesReferralsParams> {
  social: IDesktopWebTrafficSourcesSocialReferralsItem[];
  visits: number;
}

export interface IDesktopWebTrafficSourcesSocialReferralsItem extends IChange {
  page: string; // "facebook.com"
  share: number; // 0.3338006606361748
  children: any | null; // null
}

export interface IDesktopWebTrafficSourcesReferrals
  extends IMeta<IDesktopWebTrafficSourcesReferralsParams>,
    IRankings {
  referrals: IDesktopWebTrafficSourcesReferralsItem[];
  visits: number; // 9971413
}

export interface IDesktopWebTrafficSourcesReferralsItem extends IChange {
  share: number; // 0.0000028570463970084004;
  domain: string; // "pirate4x4.com";
}

export interface IDesktopWebTrafficSourcesAdNetworksParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesAdNetworks
  extends IMeta<IDesktopWebTrafficSourcesAdNetworksParams>,
    IRankings {
  ad_networks: IDesktopWebTrafficSourcesAdNetworksItem[];
}

export interface IDesktopWebTrafficSourcesAdNetworksItem extends IChange {
  ad_network: string; // "Outbrain";
  share: number; // 0.47058985398621567;
}

export interface IDesktopWebTrafficSourcesPublishersParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesPublishers
  extends IMeta<IDesktopWebTrafficSourcesPublishersParams>,
    IRankings {
  publishers: IDesktopWebTrafficSourcesPublishersItem[];
  visits: number; // 14157
}

export interface IDesktopWebTrafficSourcesPublishersItem extends IChange {
  domain: string; // "jezebel.com";
  share: number; // 0.33569303543333884;
}

export interface IDesktopWebTrafficSourcesKeywordsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    ILimitParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesKeywords
  extends IMeta<IDesktopWebTrafficSourcesKeywordsParams> {
  search: IDesktopWebTrafficSourcesKeywordsItem[];
  visits: number; // 4235059
  total_visits: number; // 4238824
}

export interface IDesktopWebTrafficSourcesKeywordsItem extends IChange {
  search_term: string; // "bbc news"
  share: number; // 0.06702531838422214
  visits: number; // 281089.5178785001
  volume: number; // 38016670
  cpc: number; // 1.3
  url: string; // "http://www.bbc.com/news/live/election-2017-40171454"
  position: number; // 9
}

export interface IDesktopWebTrafficSourcesSearchVisitDistributionParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    IDateRangeParams {}

export interface IDesktopWebTrafficSourcesSearchVisitDistribution
  extends IMeta<IDesktopWebTrafficSourcesSearchVisitDistributionParams> {
  data: IDesktopWebTrafficSourcesSearchVisitDistributionsItem[];
}

export interface IDesktopWebTrafficSourcesSearchVisitDistributionsItem {
  date: string; // "2017-11-01"
  total_search_visits: number; // 1257718.6632760502
  visits_distribution: {
    organic_branded_visits: number; // 457979.7639933713
    organic_non_branded_visits: number; // 798124.851221827
    paid_branded_visits: number; // 588.4870901906123
    paid_non_branded_visits: number; // 1025.5609706614603
  };
}

export interface IDesktopWebTrafficSourcesOutgoingAdsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopWebTrafficSourcesOutgoingAdsAdNetworks
  extends IMeta<IDesktopWebTrafficSourcesOutgoingAdsParams>,
    IRankings {
  data: IDesktopWebTrafficSourcesOutgoingAdsItem[];
}

export interface IDesktopWebTrafficSourcesOutgoingAdsAdvertisers
  extends IMeta<IDesktopWebTrafficSourcesOutgoingAdsParams> {
  advertisers: IDesktopWebTrafficSourcesOutgoingAdsItem[];
  visits: number; // 13123
}

export interface IDesktopWebTrafficSourcesOutgoingAdsItem extends IChange {
  share: number; //  0.6496048675949996
  domain: string; //  "victoriahearts.com"
}

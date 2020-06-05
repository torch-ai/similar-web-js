import {
  IChange,
  ICountryParam,
  IDateGranularityParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
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
  extends IMeta<IDesktopWebTrafficSourcesReferralsParams> {
  referrals: IDesktopWebTrafficSourcesReferralsItem[];
  visits: number; // 9971413
  global_ranking: number; // 154
  category: string; // "News_and_Media"
  category_ranking: number; // 21
}

export interface IDesktopWebTrafficSourcesReferralsItem extends IChange {
  share: number; // 0.0000028570463970084004;
  domain: string; // "pirate4x4.com";
}

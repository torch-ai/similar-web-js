import {
  IChange,
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
  IRankings,
} from "../Component.types";

export interface IMobileWebTrafficSourcesOverviewShareParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {
  // Currently only the monthly granularity is supported.
  granularity: "monthly";
}

export interface IMobileWebTrafficSourcesOverviewShare
  extends IMeta<IMobileWebTrafficSourcesOverviewShareParams> {
  visits: Record<string, IMobileWebTrafficSourcesOverviewShareItem[]>;
}

export interface IMobileWebTrafficSourcesOverviewShareItem {
  source_type: string; // "Search"
  visits: {
    date: string; // "2017-11-01"
    visits: number; // 7633375
  }[];
}

export interface IMobileWebTrafficSourcesReferralsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IMobileWebTrafficSourcesReferrals
  extends IMeta<IMobileWebTrafficSourcesReferralsParams>,
    IRankings {
  referrals: IMobileWebTrafficSourcesReferralsItem[];
  visits: number; // 9971413
}

export interface IMobileWebTrafficSourcesReferralsItem extends IChange {
  share: number; // 0.0000028570463970084004;
  domain: string; // "pirate4x4.com";
}

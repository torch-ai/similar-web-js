import {
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
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

import {
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

import {
  ICountryParam,
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

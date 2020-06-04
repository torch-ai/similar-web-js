import {
  IDateGranularityParam,
  IMainDomainOnlyParam,
  IFormatParam,
  IShowVerifiedParam,
  ICountryParam,
  IDateRangeParams,
  IMeta,
} from "../Component.types";

export interface ITotalTrafficVisitsParams
  extends IFormatParam,
    IMainDomainOnlyParam,
    IShowVerifiedParam,
    IDateGranularityParam,
    ICountryParam,
    Partial<IDateRangeParams> {}

export interface ITotalTrafficVisits extends IMeta<ITotalTrafficVisitsParams> {
  visits: ITotalTrafficVisitsItem[];
}

export interface ITotalTrafficVisitsItem {
  date: string; // "2017-11-01"
  visits: number; // 2.4781431175045157
}

export interface ITotalTrafficPagesVisits
  extends IMeta<ITotalTrafficVisitsParams> {
  pages_per_visit: ITotalTrafficVisitsItem[];
}

export interface ITotalTrafficVisitsItem {
  date: string; // "2017-11-01"
  pages_per_visit: number; // 2.4781431175045157
}

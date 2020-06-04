import {
  IDateGranularityParam,
  IMainDomainOnlyParam,
  IFormatParam,
  IShowVerifiedParam,
  ICountryParam,
  IDateRangeParams,
  IMeta,
} from "../Component.types";

export interface ITotalTrafficParams
  extends IFormatParam,
    IMainDomainOnlyParam,
    IShowVerifiedParam,
    IDateGranularityParam,
    ICountryParam,
    Partial<IDateRangeParams> {}

export interface ITotalTrafficVisits extends IMeta<ITotalTrafficParams> {
  visits: ITotalTrafficVisitsItem[];
}

export interface ITotalTrafficVisitsItem {
  date: string; // "2017-11-01"
  visits: number; // 2.4781431175045157
}

export interface ITotalTrafficPagesVisits extends IMeta<ITotalTrafficParams> {
  pages_per_visit: ITotalTrafficVisitsItem[];
}

export interface ITotalTrafficVisitsItem {
  date: string; // "2017-11-01"
  pages_per_visit: number; // 2.4781431175045157
}

export interface ITotalTrafficAverageVisitDuration
  extends IMeta<ITotalTrafficParams> {
  average_visit_duration: ITotalTrafficAverageVisitDurationItem[];
}

export interface ITotalTrafficAverageVisitDurationItem {
  date: string; // "2017-11-01"
  average_visit_duration: number; // 153.5438764195723
}

export interface ITotalTrafficBounceRate extends IMeta<ITotalTrafficParams> {
  bounce_rate: ITotalTrafficBounceRateItem[];
}

export interface ITotalTrafficBounceRateItem {
  date: string; // "2017-11-01"
  bounce_rate: number; // 0.6217884981708697
}

export interface ITotalTrafficDesktopMobileSplitParams
  extends IFormatParam,
    IMainDomainOnlyParam,
    IShowVerifiedParam,
    ICountryParam,
    IDateRangeParams {}

export interface ITotalTrafficDesktopMobileSplit
  extends IMeta<ITotalTrafficDesktopMobileSplitParams> {
  desktop_visit_share: number; // 0.3567780202168426,
  mobile_web_visit_share: number; // 0.6432219797831574
}

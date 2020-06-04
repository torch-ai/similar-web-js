import {
  ICountryParam,
  IDateGranularityParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
  IShowVerifiedParam,
} from "../Component.types";

export interface ISimilarSitesParams
  extends IFormatParam,
    Partial<IDateRangeParams> {}

export interface ISimilarSites extends IMeta<ISimilarSitesParams> {
  similar_sites: ISimilarSitesItem[];
}

export interface ISimilarSitesItem {
  url: string; // "twitter.com",
  score: number; // 1
}

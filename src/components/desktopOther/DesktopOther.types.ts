import {
  ICountryParam,
  IDateGranularityParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
  IShowVerifiedParam,
} from "../Component.types";

export interface IDesktopOtherSimilarSitesParams
  extends IFormatParam,
    Partial<IDateRangeParams> {}

export interface IDesktopOtherSimilarSites
  extends IMeta<IDesktopOtherSimilarSitesParams> {
  similar_sites: IDesktopOtherSimilarSitesItem[];
}

export interface IDesktopOtherSimilarSitesItem {
  url: string; // "twitter.com",
  score: number; // 1
}

export interface IDesktopOtherAudienceInterestsParams
  extends IFormatParam,
    IDateRangeParams,
    ICountryParam,
    IMainDomainOnlyParam {}

export interface IDesktopOtherAudienceInterests
  extends IMeta<IDesktopOtherAudienceInterestsParams> {
  records: IDesktopOtherAudienceInterestsItem[];
}

export interface IDesktopOtherAudienceInterestsItem {
  affinity: number; // 100
  overlap: number; // 0.5372281904140381
  domain: string; // "bbc.co.uk"
  has_adsense: boolean;
}

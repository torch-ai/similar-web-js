import {
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  ILimitParam,
  IMainDomainOnlyParam,
  IMeta,
} from "../Component.types";

export interface IDesktopKeywordAnalysisCompetitorsParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    Partial<IDateRangeParams> {}

export interface IDesktopKeywordAnalysisCompetitors
  extends IMeta<IDesktopKeywordAnalysisCompetitorsParams> {
  data: IDesktopKeywordAnalysisCompetitorsItem[];
}

export interface IDesktopKeywordAnalysisCompetitorsItem {
  url: string; // "argos.co.uk";
  score: number; // 0.015563718606257687;
}

export interface IDesktopKeywordAnalysisAnalyzeParams
  extends IFormatParam,
    ICountryParam,
    IMainDomainOnlyParam,
    ILimitParam,
    Partial<IDateRangeParams> {}

export interface IDesktopKeywordAnalysisAnalyze
  extends IMeta<IDesktopKeywordAnalysisAnalyzeParams> {
  traffic_breakdown: IDesktopKeywordAnalysisAnalyzeItem[];
}

export interface IDesktopKeywordAnalysisAnalyzeItem {
  domain: string; // "carmagazine.co.uk"
  traffic_share: number; // 0.5157117262448029
  position: number; // 1
  destination_url: string; // "http://www.carmagazine.co.uk/"
  website_categories: string; // "Autos_and_Vehicles/Automotive_News"
}

import {
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
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

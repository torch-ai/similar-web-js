import {
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
  IShowVerifiedParam,
} from "../Component.types";

export interface ILeadEnrichmentParams
  extends IFormatParam,
    IMainDomainOnlyParam,
    IShowVerifiedParam,
    ICountryParam,
    IDateRangeParams {}

export interface ILeadEnrichment extends IMeta<ILeadEnrichmentParams> {
  global_rank: number; // 67
  site_type: string; // "content"
  employee_range: string; // "> 10,000"
  estimated_revenue_in_usd: string; // "> $1B"
  zip_code: string; // "W12 0ZY"
  headquarters: string; // "London, United Kingdom"
  website_category: string; // "News_and_Media"
  category_rank: number; // 9
  visits: {
    date: string; // "2019-01-01"
    value: number; // 21327158.894126087
  }[];
  pages_per_visit: {
    date: string; // "2019-01-01",
    value: number; // 1.9075922053853587
  }[];
  unique_visitors: {
    date: string; // "2019-01-01",
    value: number; // 10020945.9971818
  }[];
  bounce_rate: {
    date: string; // "2019-01-01",
    value: number; // 0.720603645898662
  }[];
  average_visit_duration: {
    date: string; // "2019-01-01",
    value: number; // 117.7780933420915 (in seconds)
  }[];
  mom_growth: {
    date: string; // "2019-01-01",
    value: number; // 0.03377594119765046
  }[];
  mobile_desktop_share: {
    date: string; // "2019-01-01",
    value: {
      desktop_share: number; // 0.4401421923265589
      mobile_share: number; // 0.5598578076734411
    };
  }[];
  traffic_sources: {
    date: string; // "2019-01-01",
    value: {
      source_type: string; // "Direct"
      share: number; // 0.49089905391381494
    }[];
  }[];
  geography_share: {
    date: string; // "2019-01-01",
    value: {
      country: number; // 826 // TODO Errr.. What? how does this map to countries?
      share: number; // 0.8824262642650591
    }[];
  }[];
}

export interface ITechnographicsParams extends IFormatParam {}

export interface ITechnographics {
  site_name: string; // "bbc.co.uk"
  global_rank: number; // 66
  category: string; // "News_and_Media"
  category_rank: number; // 9
  technologies: ITechnographicsTechnology[];
}

export interface ITechnographicsTechnology {
  technology_name: string; // "Adobe Marketing Cloud"
  category: string; // "Marketing"
  sub_category: string; // "Marketing"
  free_paid: "Free" | "Paid";
  description: string; // "End-to-end digital marketing solution"
}

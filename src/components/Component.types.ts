export type Formats = "json" | "xml";
export interface IFormatParam {
  format?: Formats;
}

export interface IMainDomainOnlyParam {
  // Return values for the main domain only ('true'), or include also the subdomains ('false')
  main_domain_only?: boolean;
}

export interface IShowVerifiedParam {
  // Show shared Google Analytics data when available. Default value is 'false'
  show_verified?: boolean;
}

export type DateGranularity = "Daily" | "Weekly" | "Monthly";
export interface IDateGranularityParam {
  // Show shared Google Analytics data when available. Default value is 'false'
  granularity: DateGranularity;
}

export type CountryOption = "world" | string;
export interface ICountryParam {
  // Country filter, as a 2-letter ISO country code, or "world" for worldwide.
  // To see the country filters you have access to, please refer to the Check Capabilities endpoint.
  country: CountryOption;
}

export interface IDateRangeParams {
  start_date: string; // 2017-11 format: YYYY-MM-DD or YYYY-MM
  end_date: string; // 2018-01 format: YYYY-MM-DD or YYYY-MM
}

export interface IMeta<Params> {
  meta: {
    request: IMetaRequest<Params>;
    status: "Success" | "Error";
    error_code?: number;
    error_message?: string;
    last_updated: string; // "2019-02-28"
  };
}

export type IMetaRequest<Params> = Params & {
  domain: string;
  limit: null | any;
};

export interface ICountry {
  code: string; // "AR" | "world"
  name: string; // "Argentina" | "world"
}

export interface IDateRange {
  start_date: string; // "2016-01-01",
  end_date: string; // "2019-01-31"
}

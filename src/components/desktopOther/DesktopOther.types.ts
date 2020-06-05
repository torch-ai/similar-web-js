import {
  IChange,
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
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

export interface IDesktopOtherCategoryRankParams extends IFormatParam {}

export interface IDesktopOtherCategoryRank
  extends IMeta<IDesktopOtherCategoryRankParams> {
  category: string; // "Internet_and_Telecom/Social_Network"
  rank: number; // 1
}

export interface IDesktopOtherTopSitesParams
  extends IFormatParam,
    ICountryParam {}

export interface IDesktopOtherTopSitesDescription {
  response: {
    top_sites: {
      countries: Record<string, IDateRangeParams>;
    };
    categories: string[];
  };
}

export interface IDesktopOtherTopSites
  extends IMeta<IDesktopOtherTopSitesParams> {
  top_sites: IDesktopOtherTopSiteItem[];
}

export interface IDesktopOtherTopSiteItem {
  rank: number; // 1
  domain: string; // "spotify.com"
}

export interface IDesktopOtherApiLight {
  site_name: string; // "bbc.com"
  is_site_verified: boolean; // false
  category: string; // "News_and_Media"
  large_screenshot: string; // "https://site-images.similarcdn.com/image?url=bbc.com&t=1&s=1&h=291e039829bc725eb527993be3c2f65b3b36650ab5d0ccac6af3ce04a40ab895"
  reach_months: number; // 6
  data_months: number; // 1
  global_rank: {
    rank: number; // 116
    direction: number; // 7
  };
  country_rank: {
    country: number; // 840
    rank: number; // 129
    direction: number; // -5
  };
  category_rank: {
    category: string; // "News_and_Media"
    rank: number; // 19
    direction: number; // 1
  };
  title: string; // "bbc - homepage"
  description: string; // "breaking news, sport, tv, radio and a whole lot more.        the bbc informs, educates and entertains - wherever you are, whatever your age."
  redirect_url: string; // "bbc.com"
  estimated_monthly_visits: Record<string, number>; // 2019-04-01: 418625462
  engagments: {
    year: number; // 2019
    month: number; // 9
    visits: number; // 366733433.94747484
    time_on_site: number; // 179.54781293832468
    page_per_visit: number; // 2.4261377278380403
    bounce_rate: number; // 0.6059819454951987
  };
  top_country_shares: IChange &
    {
      country: number; // 840
      value: number; // 0.2761380577987913
    }[];
  traffic_sources: {
    search: number; //  0.29581501124261517
    social: number; //  0.10586656849496985
    mail: number; //  0.025483306293247077
    paid_referrals?: number; //  0.0008191227563123541
    direct: number; //  0.43748177777649255
    referrals: number; //  0.13453421343636301
  };
  referrals_ratio: number; // 0.13453421343636301
  top_referring: ISiteValueChange[];
  total_referring: number;
  top_destinations: ISiteValueChange[];
  total_destinations: number; // 1000
  search_ratio: number; // 0.29581501124261517
  top_organic_keywords: IKeywordValueChange[];
  top_paid_keywords: IKeywordValueChange[];
  organic_keywords_rolling_unique_count: number; // 8700
  paid_keywords_rolling_unique_count: number; // 18
  organic_search_share: number; // 0.9992762057407133
  paid_search_share: number; // 0.000723794259286703
  social_ratio: number; // 0.10586656849496985
  top_social: IChange &
    {
      name: string; // "Facebook"
      icon: string; // "https://site-images.similarcdn.com/image?url=facebook.com&t=2&s=1&h=be773d6b77aa3d59b6a671c5c27ad729b1ae77400e89776e2f749cce6b926c4b"
      site: string; // "facebook.com"
      value: number; // 0.5160428588675054
    }[];
  display_ads_ratio: number; // 0.0008191227563123541
  top_publishers: ISiteValueChange[];
  top_ad_networks: ISiteValueChange[];
  incoming_ads_rolling_unique_count: number; // 62
  also_visited_unique_count: number; // 0
  similar_sites: ISiteRank[];
  similar_sites_by_rank: ISiteRank[];
  mobile_apps: Record<
    string,
    {
      key: string; // 0
      app_id: string; // "bbc.mobile.news.ww"
      title: string; // "BBC News"
      cover: string; // "https://lh3.googleusercontent.com/Iip-8Yn3PLAzecCMb4ZaHTvFObl3ETUWZmd5zLflhbB6BXKyNc5aM4hrGAA9NXSs7i0=s180"
      author: string; // "BBC Worldwide (Ltd)"
      category: string; // "News & Magazines"
      price: string; // "Free"
      rating: number; // 4.372805118560791
      rating_count: number; // 331436
      valid: boolean;
    }
  >;
  daily_visits_min_date: string; // "2019-04-01"
  daily_visits_max_date: string; // "2019-09-30"
}

export interface ISiteValueChange extends IChange {
  site: number; // "bbc.co.uk"
  value: number; // 0.7109386251464077
}

export interface IKeywordValueChange extends IChange {
  keyword: number; // "bbc news"
  value: number; // 0.7109386251464077
}

export interface ISiteRank {
  site: string; // "theguardian.com"
  screenshot: string; // "https://site-images.similarcdn.com/image?url=theguardian.com&t=0&s=1&h=ab454b700908b1922212c63399b614e1d1b6a0d25fbdaa0214317efda8a199cd"
  rank: number; // 145
}

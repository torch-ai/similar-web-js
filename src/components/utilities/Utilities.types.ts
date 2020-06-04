import { ICountry, IDateRange } from "../Component.types";

export interface ICapabilities {
  remaining_hits: number;
  web_desktop_data: ICapabilitiesData;
  web_mobile_data: ICapabilitiesData;
  app_data: ICapabilitiesData;
  app_engagement_data: ICapabilitiesData;
}

export interface ICapabilitiesData {
  snapshot_interval: IDateRange;
  countries: ICountry[];
}

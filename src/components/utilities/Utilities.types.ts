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

export interface ICategories extends Record<string, Record<string, string>> {
  Arts_and_Entertainment: Record<string, string>;
  Business_and_Consumer_Services: Record<string, string>;
  Community_and_Society: Record<string, string>;
  Computers_Electronics_and_Technology: Record<string, string>;
  "E-commerce_and_Shopping": Record<string, string>;
  Finance: Record<string, string>;
  Food_and_Drink: Record<string, string>;
  Gambling: Record<string, string>;
  Games: Record<string, string>;
  Health: Record<string, string>;
  Heavy_Industry_and_Engineering: Record<string, string>;
  Hobbies_and_Leisure: Record<string, string>;
  Home_and_Garden: Record<string, string>;
  Jobs_and_Career: Record<string, string>;
  Law_and_Government: Record<string, string>;
  Lifestyle: Record<string, string>;
  News_and_Media: Record<string, string>;
  Pets_and_Animals: Record<string, string>;
  Reference_Materials: Record<string, string>;
  Science_and_Education: Record<string, string>;
  Sports: Record<string, string>;
  Travel_and_Tourism: Record<string, string>;
  Vehicles: Record<string, string>;
  Adult: Record<string, string>;
}

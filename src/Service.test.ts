import { config } from "dotenv";
import Service from "./Service";
import { IServiceOptions } from "./Service.types";
import {
  IChange,
  ICountryParam,
  IDateRangeParams,
  IFormatParam,
  IMainDomainOnlyParam,
  IMeta,
} from "./components/Component.types";
import {
  ITotalTrafficDeduplicatedAudienceParams,
  ITotalTrafficDesktopMobileSplitParams,
  ITotalTrafficParams,
} from "./components/totalTraffic/TotalTraffic.types";

export const loadConfig = () => {
  const result = config();
  if (result.error) {
    throw result.error;
  }
};

let service: Service;
export const getService = (): Service => {
  if (service) {
    return service;
  }

  loadConfig();
  const onInvalidCredentials = jest.fn(() => {});
  const options: IServiceOptions = {
    apiKey: process.env.API_KEY,
    onInvalidCredentials: onInvalidCredentials,
  };
  service = new Service(options);
  return service;
};

export const expectWebsiteMeta = (
  meta: IMeta<any>["meta"],
  domain: string,
  options: Partial<ICountryParam> &
    Partial<IMainDomainOnlyParam> &
    Partial<IFormatParam> &
    Partial<IDateRangeParams> = {}
) => {
  expectMeta(meta, options);
  expect(meta.request.domain).toBe(domain);
};

export const expectKeywordsMeta = (
  meta: IMeta<any>["meta"],
  keyword: string,
  options: Partial<ICountryParam> &
    Partial<IMainDomainOnlyParam> &
    Partial<IFormatParam> &
    Partial<IDateRangeParams> = {}
) => {
  expectMeta(meta, options);
  expect(meta.request.keyword).toBe(keyword);
};

export const expectMeta = (
  meta: IMeta<any>["meta"],
  options: Partial<ICountryParam> &
    Partial<IMainDomainOnlyParam> &
    Partial<IFormatParam> &
    Partial<IDateRangeParams> = {}
) => {
  expect(meta).toBeTruthy();
  expect(meta.status).toBe("Success");
  if (options.country) {
    expect(meta.request.country).toBe(options.country);
  }
  if (options.main_domain_only) {
    expect(meta.request.main_domain_only).toBe(options.main_domain_only);
  }
  if (options.start_date) {
    expect(meta.request.start_date).toMatch(options.start_date);
  }
  if (options.end_date) {
    expect(meta.request.end_date).toMatch(options.end_date);
  }
  if (options.format) {
    expect(meta.request.format).toBe(options.format);
  }
};

export const expectChange = (data: IChange) => {
  if (typeof data.change === "number") {
    return expect(true).toBeTruthy();
  }
  if (typeof data.change === "string") {
    return expect(
      ["NaN", "Infinity"].indexOf(data.change)
    ).toBeGreaterThanOrEqual(0);
  }
  expect(data.change).toBeNull();
};

/**
 * The tests
 */
describe("service", () => {
  const service = getService();
  it("should be an instance of Service", () => {
    expect(service).toBeInstanceOf(Service);
  });

  it("should format dates", () => {
    const date = new Date("2020-02-03T08:44:00Z");
    expect(Service.formatDate(date)).toBe("2020-02-03");
  });
});

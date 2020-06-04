import { config } from "dotenv";
import Service from "./Service";
import { IServiceOptions } from "./Service.types";

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

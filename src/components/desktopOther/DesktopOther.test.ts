import { expectMeta, getService } from "../../Service.test";
import Service from "../../Service";
import { DesktopOther } from "./DesktopOther";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.desktopOther", () => {
  // const defaultOptions = {
  //     country: "world",
  //     main_domain_only: false,
  // };
  // const options: ITotalTrafficParams = {
  //     ...defaultOptions,
  //     granularity: "Daily",
  // };
  // const earlier = new Date();
  // earlier.setUTCMonth(earlier.getUTCMonth() - 3);
  // const earlierThanThat = new Date();
  // earlierThanThat.setUTCFullYear(
  //     earlier.getUTCFullYear() - 1,
  //     earlier.getUTCMonth()
  // );

  it("should be an instance of DesktopOther", () => {
    expect(service.desktopOther).toBeInstanceOf(DesktopOther);
  });

  describe("similar sites", () => {
    it("should get", async () => {
      const similarSites = await service.desktopOther.similarSites(testDomain);
      expectMeta(similarSites.meta, testDomain, {});

      expect(similarSites.similar_sites.length).toBeGreaterThan(0);
      const similarSite = similarSites.similar_sites.shift();
      expect(similarSite.score).toBeGreaterThan(0);
      expect(similarSite.url).toBeTruthy();
    });
  });
});

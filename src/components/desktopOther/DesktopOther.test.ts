import { expectMeta, getService } from "../../Service.test";
import Service from "../../Service";
import { DesktopOther } from "./DesktopOther";
import { IDesktopOtherAudienceInterestsParams } from "./DesktopOther.types";
import { IDateRange } from "../Component.types";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.desktopOther", () => {
  const defaultOptions = {
    country: "world",
    main_domain_only: false,
  };
  const earlier = new Date();
  earlier.setUTCMonth(earlier.getUTCMonth() - 3);
  const earlierThanThat = new Date();
  earlierThanThat.setUTCFullYear(
    earlier.getUTCFullYear() - 1,
    earlier.getUTCMonth()
  );
  const optionDates: IDateRange = {
    start_date: Service.formatDate(earlierThanThat),
    end_date: Service.formatDate(earlierThanThat),
  };

  it("should be an instance of DesktopOther", () => {
    expect(service.desktopOther).toBeInstanceOf(DesktopOther);
  });

  describe("similar sites", () => {
    it("should get", async (done) => {
      const similarSites = await service.desktopOther.similarSites(testDomain);
      expectMeta(similarSites.meta, testDomain, {});

      expect(similarSites.similar_sites.length).toBeGreaterThan(0);
      const similarSite = similarSites.similar_sites.shift();
      expect(similarSite.score).toBeGreaterThan(0);
      expect(similarSite.url).toBeTruthy();

      done();
    });
  });

  describe("audience interest", () => {
    it("should get", async (done) => {
      const options = {
        ...defaultOptions,
        ...optionDates,
      };
      const similarSites = await service.desktopOther.audienceInterests(
        testDomain,
        options
      );
      expectMeta(similarSites.meta, testDomain, {});

      expect(similarSites.records.length).toBeGreaterThan(0);
      const record = similarSites.records.shift();
      expect(record.affinity).toBeGreaterThan(0);
      expect(record.overlap).toBeGreaterThan(0);
      expect(record.domain).toBeTruthy();
      expect(typeof record.has_adsense === "boolean").toBeTruthy();

      done();
    });
  });
});

import { expectWebsiteMeta, getService } from "../../Service.test";
import { TotalTraffic } from "./TotalTraffic";
import {
  ITotalTrafficDeduplicatedAudienceParams,
  ITotalTrafficDesktopMobileSplitParams,
  ITotalTrafficParams,
} from "./TotalTraffic.types";
import { SimilarWebError } from "../../Service.types";
import Service from "../../Service";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.totalTraffic", () => {
  const defaultOptions = {
    country: "world",
    main_domain_only: false,
  };
  const options: ITotalTrafficParams = {
    ...defaultOptions,
    granularity: "Daily",
  };
  const earlier = new Date();
  earlier.setUTCMonth(earlier.getUTCMonth() - 3);
  const earlierThanThat = new Date();
  earlierThanThat.setUTCFullYear(
    earlier.getUTCFullYear() - 1,
    earlier.getUTCMonth()
  );

  it("should be an instance of TotalTraffic", () => {
    expect(service.totalTraffic).toBeInstanceOf(TotalTraffic);
  });

  describe("error handling", () => {
    it("should throw an error if a bad domain is provided", async () => {
      expect.assertions(3);
      service.totalTraffic
        .visits(testDomain.replace(".", ""), options)
        .catch((error: SimilarWebError) => {
          expect(error.isSimilarWebError).toBeTruthy();
          expect(error.message).toMatch("Error");
          expect(error.code).toBeTruthy();
        });
    });
  });

  describe("visits", () => {
    it("should get", async () => {
      const results = await service.totalTraffic.visits(testDomain, options);
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, options);

      expect(results.visits.length).toBeGreaterThan(0);
      const item = results.visits.shift();
      expect(item.date).toBeTruthy();
      expect(item.visits).toBeGreaterThan(0);
    });
  });

  describe("pages / visits", () => {
    it("should get", async () => {
      const results = await service.totalTraffic.pagesVisits(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, options);

      expect(results.pages_per_visit.length).toBeGreaterThan(0);
      const item = results.pages_per_visit.shift();
      expect(item.date).toBeTruthy();
      expect(item.pages_per_visit).toBeGreaterThan(0);
    });
  });

  describe("average visit duration", () => {
    it("should get", async () => {
      const results = await service.totalTraffic.averageVisitDuration(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, options);

      expect(results.average_visit_duration.length).toBeGreaterThan(0);
      const item = results.average_visit_duration.shift();
      expect(item.date).toBeTruthy();
      expect(item.average_visit_duration).toBeGreaterThan(0);
    });
  });

  describe("bounce rate", () => {
    it("should get", async () => {
      const results = await service.totalTraffic.bounceRate(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, options);

      expect(results.bounce_rate.length).toBeGreaterThan(0);
      const item = results.bounce_rate.shift();
      expect(item.date).toBeTruthy();
      expect(item.bounce_rate).toBeGreaterThan(0);
    });
  });

  describe("desktop mobile split", () => {
    it("should get", async () => {
      const optionsWithDates: ITotalTrafficDesktopMobileSplitParams = {
        ...defaultOptions,
        start_date: Service.formatDate(earlierThanThat, "month"),
        end_date: Service.formatDate(earlier, "month"),
      };
      const results = await service.totalTraffic.desktopMobileSplit(
        testDomain,
        optionsWithDates
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, optionsWithDates);
      expect(results.desktop_visit_share).toBeGreaterThanOrEqual(0);
      expect(results.mobile_web_visit_share).toBeGreaterThanOrEqual(0);
    });
  });

  describe("deduplicated audience", () => {
    it("should get", async () => {
      const optionsWithDates: ITotalTrafficDeduplicatedAudienceParams = {
        ...defaultOptions,
        start_date: Service.formatDate(earlierThanThat, "month"),
        end_date: Service.formatDate(earlier, "month"),
      };
      const results = await service.totalTraffic.deduplicatedAudience(
        testDomain,
        optionsWithDates
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, optionsWithDates);
      expect(results.data.length).toBeGreaterThan(0);
      const data = results.data.shift();
      expect(data.date).toBeTruthy();
      expect(
        data.dedup_data.desktop_and_mobile_web_audience_share
      ).toBeGreaterThanOrEqual(0);
      expect(
        data.dedup_data.desktop_only_audience_share
      ).toBeGreaterThanOrEqual(0);
      expect(
        data.dedup_data.mobile_web_only_audience_share
      ).toBeGreaterThanOrEqual(0);
      expect(
        data.dedup_data.total_deduplicated_audience
      ).toBeGreaterThanOrEqual(0);
    });
  });
});

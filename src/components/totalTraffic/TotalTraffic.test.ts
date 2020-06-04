import { getService } from "../../Service.test";
import { TotalTraffic } from "./TotalTraffic";
import { ITotalTrafficParams } from "./TotalTraffice.types";
import { SimilarWebError } from "../../Service.types";
import { IMeta } from "../Component.types";

const service = getService();
const testDomain = "bbc.com";

const expectTrafficMeta = (
  meta: IMeta<any>["meta"],
  options: ITotalTrafficParams
) => {
  expect(meta).toBeTruthy();
  expect(meta.last_updated).toBeTruthy();
  expect(meta.status).toBe("Success");
  expect(meta.request.domain).toBe(testDomain);
  expect(meta.request.country).toBe(options.country);
  expect(meta.request.granularity).toBe(options.granularity);
  expect(meta.request.main_domain_only).toBe(options.main_domain_only);
};

/**
 * The tests
 */
describe("service.totalTraffic", () => {
  const options: ITotalTrafficParams = {
    country: "world",
    granularity: "Daily",
    main_domain_only: false,
  };

  it("should be an instance of TotalTraffic", () => {
    expect(service.totalTraffic).toBeInstanceOf(TotalTraffic);
  });

  describe("error handling", () => {
    it("should throw an error if a bad domain is provided", async (done) => {
      expect.assertions(3);
      service.totalTraffic
        .visits(testDomain.replace(".", ""), options)
        .catch((error: SimilarWebError) => {
          expect(error.isSimilarWebError).toBeTruthy();
          expect(error.message).toMatch("Error");
          expect(error.code).toBeTruthy();
          done();
        });
    });
  });

  describe("visits", () => {
    it("should get", async (done) => {
      const results = await service.totalTraffic.visits(testDomain, options);
      expect(results).toBeTruthy();
      expectTrafficMeta(results.meta, options);

      expect(results.visits.length).toBeGreaterThan(0);
      const item = results.visits.shift();
      expect(item.date).toBeTruthy();
      expect(item.visits).toBeGreaterThan(0);

      done();
    });
  });

  describe("pages / visits", () => {
    it("should get", async (done) => {
      const results = await service.totalTraffic.pagesVisits(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectTrafficMeta(results.meta, options);

      expect(results.pages_per_visit.length).toBeGreaterThan(0);
      const item = results.pages_per_visit.shift();
      expect(item.date).toBeTruthy();
      expect(item.pages_per_visit).toBeGreaterThan(0);

      done();
    });
  });

  describe("average visit duration", () => {
    it("should get", async (done) => {
      const results = await service.totalTraffic.averageVisitDuration(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectTrafficMeta(results.meta, options);

      expect(results.average_visit_duration.length).toBeGreaterThan(0);
      const item = results.average_visit_duration.shift();
      expect(item.date).toBeTruthy();
      expect(item.average_visit_duration).toBeGreaterThan(0);

      done();
    });
  });
});

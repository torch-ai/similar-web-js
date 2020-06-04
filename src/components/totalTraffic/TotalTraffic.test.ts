import { getService } from "../../Service.test";
import { TotalTraffic } from "./TotalTraffic";
import { ITotalTrafficVisitsParams } from "./TotalTraffice.types";
import { SimilarWebError } from "../../Service.types";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.totalTraffic", () => {
  it("should be an instance of TotalTraffic", () => {
    expect(service.totalTraffic).toBeInstanceOf(TotalTraffic);
  });

  describe("error handling", () => {
    it("should throw an error if a bad domain is provided", async (done) => {
      const options: ITotalTrafficVisitsParams = {
        country: "world",
        granularity: "Daily",
        main_domain_only: false,
      };

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
      const options: ITotalTrafficVisitsParams = {
        country: "world",
        granularity: "Daily",
        main_domain_only: false,
      };
      const results = await service.totalTraffic.visits(testDomain, options);
      expect(results).toBeTruthy();
      expect(results.meta).toBeTruthy();
      expect(results.meta.last_updated).toBeTruthy();
      expect(results.meta.status).toBe("Success");
      expect(results.meta.request.domain).toBe(testDomain);
      expect(results.meta.request.country).toBe(options.country);
      expect(results.meta.request.granularity).toBe(options.granularity);
      expect(results.meta.request.main_domain_only).toBe(
        options.main_domain_only
      );
      expect(results.visits.length).toBeGreaterThan(0);

      const item = results.visits.shift();
      expect(item.date).toBeTruthy();
      expect(item.visits).toBeGreaterThan(0);

      done();
    });
  });

  describe("pages / visits", () => {
    it("should get", async (done) => {
      const options: ITotalTrafficVisitsParams = {
        country: "world",
        granularity: "Daily",
        main_domain_only: false,
      };
      const results = await service.totalTraffic.pagesVisits(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expect(results.meta).toBeTruthy();
      expect(results.meta.last_updated).toBeTruthy();
      expect(results.meta.status).toBe("Success");
      expect(results.meta.request.domain).toBe(testDomain);
      expect(results.meta.request.country).toBe(options.country);
      expect(results.meta.request.granularity).toBe(options.granularity);
      expect(results.meta.request.main_domain_only).toBe(
        options.main_domain_only
      );
      expect(results.pages_per_visit.length).toBeGreaterThan(0);

      const item = results.pages_per_visit.shift();
      expect(item.date).toBeTruthy();
      expect(item.pages_per_visit).toBeGreaterThan(0);

      done();
    });
  });
});

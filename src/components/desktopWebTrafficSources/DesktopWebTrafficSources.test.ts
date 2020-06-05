import { expectWebsiteMeta, getService } from "../../Service.test";
import { DesktopWebTrafficSources } from "./DesktopWebTrafficSources";
import {
  IDesktopWebTrafficSourcesEngagementMetrics,
  IDesktopWebTrafficSourcesOverviewShareParams,
} from "./DesktopWebTrafficSources.types";

const service = getService();
const testDomain = "bbc.com";

const expectEngagementMetric = (
  metrics: IDesktopWebTrafficSourcesEngagementMetrics
) => {
  metrics.data.forEach((datum) => {
    expect(datum.source_type).toBeTruthy();
    datum.values.forEach((value) => {
      expect(value.date).toBeTruthy();
      expect(value.value).toBeGreaterThanOrEqual(0);
    });
  });
};

/**
 * The tests
 */
describe("service.desktopWebTrafficSources", () => {
  const defaultOptions = {
    country: "world",
    main_domain_only: false,
  };

  it("should be an instance of DesktopWebTrafficSources", () => {
    expect(service.desktopWebTrafficSources).toBeInstanceOf(
      DesktopWebTrafficSources
    );
  });

  describe("overview", () => {
    it("should get", async (done) => {
      const results = await service.desktopWebTrafficSources.overview(
        testDomain,
        defaultOptions
      );

      expectWebsiteMeta(results.meta, testDomain, defaultOptions);

      results.overview.forEach((source) => {
        expect(source.domain).toBeTruthy();
        expect(source.source_type).toBeTruthy();
        expect(source.share).toBeGreaterThan(0);
      });

      done();
    });
  });

  describe("overview share", () => {
    it("should get", async (done) => {
      const options: IDesktopWebTrafficSourcesOverviewShareParams = {
        ...defaultOptions,
        granularity: "Monthly",
      };
      const results = await service.desktopWebTrafficSources.overviewShare(
        testDomain,
        options
      );

      expectWebsiteMeta(results.meta, testDomain, options);

      Object.keys(results.visits)
        .map((key) => results.visits[key])
        .forEach((sources) => {
          sources.forEach((source) => {
            expect(source.source_type).toBeTruthy();
            source.visits.forEach((visits) => {
              expect(visits.date).toBeTruthy();
              expect(visits.organic).toBeGreaterThanOrEqual(0);
              expect(visits.paid).toBeGreaterThanOrEqual(0);
            });
          });
        });

      done();
    });
  });

  describe("pages per visit", () => {
    it("should get", async (done) => {
      const options: IDesktopWebTrafficSourcesOverviewShareParams = {
        ...defaultOptions,
        granularity: "Monthly",
      };
      const results = await service.desktopWebTrafficSources.pagesPerVisit(
        testDomain,
        options
      );

      expectWebsiteMeta(results.meta, testDomain, options);
      expectEngagementMetric(results);

      done();
    });
  });

  describe("average visit duration", () => {
    it("should get", async (done) => {
      const options: IDesktopWebTrafficSourcesOverviewShareParams = {
        ...defaultOptions,
        granularity: "Monthly",
      };
      const results = await service.desktopWebTrafficSources.averageVisitDuration(
        testDomain,
        options
      );

      expectWebsiteMeta(results.meta, testDomain, options);
      expectEngagementMetric(results);

      done();
    });
  });
});

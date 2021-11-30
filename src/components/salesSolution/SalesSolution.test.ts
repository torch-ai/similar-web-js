import { expectWebsiteMeta, getService } from "../../Service.test";
import { SalesSolution } from "./SalesSolution";
import { ILeadEnrichmentParams } from "./SalesSolution.types";
import Service from "../../Service";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.salesSolution", () => {
  const earlier = new Date();
  earlier.setUTCMonth(earlier.getUTCMonth() - 3);
  const earlierThanThat = new Date();
  earlierThanThat.setUTCFullYear(
    earlier.getUTCFullYear(),
    earlier.getUTCMonth() - 6
  );

  it("should be an instance of SalesSolution", () => {
    expect(service.salesSolution).toBeInstanceOf(SalesSolution);
  });

  describe("lead enrichment", () => {
    it("should get", async () => {
      const options: ILeadEnrichmentParams = {
        country: "us",
        start_date: Service.formatDate(earlierThanThat, "month"),
        end_date: Service.formatDate(earlier, "month"),
      };
      const results = await service.salesSolution.leadEnrichment(
        testDomain,
        options
      );
      expect(results).toBeTruthy();
      expectWebsiteMeta(results.meta, testDomain, options);
      expect(results.global_rank).toBeGreaterThan(0);
      expect(results.site_type).toBeTruthy();
      expect(results.employee_range).toBeTruthy();
      expect(results.estimated_revenue_in_usd).toBeTruthy();
      expect(results.zip_code).toBeTruthy();
      expect(results.headquarters).toBeTruthy();
      expect(results.website_category).toBeTruthy();
      expect(results.category_rank).toBeGreaterThan(0);

      const visits = results.visits.shift();
      if (visits) {
        expect(visits.date).toBeTruthy();
        expect(visits.value).toBeGreaterThanOrEqual(0);
      }

      const pagesPerVisit = results.pages_per_visit.shift();
      if (pagesPerVisit) {
        expect(pagesPerVisit.date).toBeTruthy();
        expect(pagesPerVisit.value).toBeGreaterThanOrEqual(0);
      }

      const uniqueVisitors = results.unique_visitors.shift();
      if (uniqueVisitors) {
        expect(uniqueVisitors.date).toBeTruthy();
        expect(uniqueVisitors.value).toBeGreaterThanOrEqual(0);
      }

      const bounceRate = results.bounce_rate.shift();
      if (bounceRate) {
        expect(bounceRate.date).toBeTruthy();
        expect(bounceRate.value).toBeGreaterThanOrEqual(0);
      }

      const averageVisitDuration = results.average_visit_duration.shift();
      if (averageVisitDuration) {
        expect(averageVisitDuration.date).toBeTruthy();
        expect(averageVisitDuration.value).toBeGreaterThanOrEqual(0);
      }

      const momGrowth = results.mom_growth.shift();
      if (momGrowth) {
        expect(momGrowth.date).toBeTruthy();
        expect(momGrowth.value).toBeGreaterThanOrEqual(0);
      }

      const mobileDesktopShare = results.mobile_desktop_share.shift();
      if (mobileDesktopShare) {
        expect(mobileDesktopShare.date).toBeTruthy();
        expect(mobileDesktopShare.value.desktop_share).toBeGreaterThanOrEqual(
          0
        );
        expect(mobileDesktopShare.value.mobile_share).toBeGreaterThanOrEqual(0);
      }

      const trafficSources = results.traffic_sources.shift();
      if (trafficSources) {
        expect(trafficSources.date).toBeTruthy();
        const trafficSource = trafficSources.value.shift();
        expect(trafficSource.source_type).toBeTruthy();
        expect(trafficSource.share).toBeGreaterThanOrEqual(0);
      }

      const geographyShares = results.geography_share.shift();
      if (geographyShares) {
        expect(geographyShares.date).toBeTruthy();
        const geographyShare = geographyShares.value.shift();
        expect(geographyShare.country).toBeGreaterThan(0);
        expect(geographyShare.share).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("technographics", () => {
    // At the time of writing, this was returning 403 Forbidden for my login
    it.skip("should get", async () => {
      const technographics = await service.salesSolution.technographics(
        testDomain
      );
      expect(technographics).toBeTruthy();
      expect(technographics.category).toBeTruthy();
      expect(technographics.category_rank).toBeGreaterThan(0);
      expect(technographics.global_rank).toBeGreaterThan(0);
      expect(technographics.site_name).toBeTruthy();
      expect(technographics.technologies.length).toBeGreaterThan(0);

      const technology = technographics.technologies.shift();
      expect(technology.category).toBeTruthy();
      expect(technology.description).toBeTruthy();
      expect(technology.free_paid).toBeTruthy();
      // expect(technology.sub_category).toBeTruthy();
      expect(technology.technology_name).toBeTruthy();
    });
  });
});

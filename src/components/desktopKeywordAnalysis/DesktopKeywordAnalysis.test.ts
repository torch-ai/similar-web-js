import {
  expectKeywordsMeta,
  expectWebsiteMeta,
  getService,
} from "../../Service.test";
import { DesktopKeywordAnalysis } from "./DesktopKeywordAnalysis";
import {
  IDesktopKeywordAnalysisAnalyzeParams,
  IDesktopKeywordAnalysisCompetitorsParams,
} from "./DesktopKeywordAnalysis.types";

const service = getService();
const testDomain = "bbc.com";
const testKeyword = "car";

/**
 * The tests
 */
describe("service.desktopKeywordAnalysis", () => {
  const defaultOptions = {
    country: "world",
    main_domain_only: false,
  };

  it("should be an instance of DesktopKeywordAnalysis", () => {
    expect(service.desktopKeywordAnalysis).toBeInstanceOf(
      DesktopKeywordAnalysis
    );
  });

  describe("competitors organic", () => {
    it("should get", async (done) => {
      const options: IDesktopKeywordAnalysisCompetitorsParams = {
        ...defaultOptions,
      };
      const competitors = await service.desktopKeywordAnalysis.competitorsOrganic(
        testDomain,
        options
      );
      expectWebsiteMeta(competitors.meta, testDomain, options);

      competitors.data.forEach((datum) => {
        expect(datum.score).toBeGreaterThanOrEqual(0);
        expect(datum.url).toBeTruthy();
      });

      done();
    });
  });

  describe("competitors paid", () => {
    it("should get", async (done) => {
      const options: IDesktopKeywordAnalysisCompetitorsParams = {
        ...defaultOptions,
      };
      const competitors = await service.desktopKeywordAnalysis.competitorsPaid(
        testDomain,
        options
      );
      expectWebsiteMeta(competitors.meta, testDomain, options);

      competitors.data.forEach((datum) => {
        expect(datum.score).toBeGreaterThanOrEqual(0);
        expect(datum.url).toBeTruthy();
      });

      done();
    });
  });

  describe("analyze organic", () => {
    it("should get", async (done) => {
      const options: IDesktopKeywordAnalysisAnalyzeParams = {
        ...defaultOptions,
        limit: 3,
      };
      const analysis = await service.desktopKeywordAnalysis.analyzeOrganic(
        testKeyword,
        options
      );
      expectKeywordsMeta(analysis.meta, testKeyword, options);

      analysis.traffic_breakdown.forEach((datum) => {
        expect(datum.domain).toBeTruthy();
        expect(datum.traffic_share).toBeGreaterThan(0);
        expect(Number.isInteger(datum.position)).toBeTruthy();
        expect(datum.destination_url).toBeTruthy();
        expect(datum.website_categories).toBeTruthy();
      });

      done();
    });
  });

  describe("analyze paid", () => {
    it("should get", async (done) => {
      const options: IDesktopKeywordAnalysisAnalyzeParams = {
        ...defaultOptions,
        limit: 3,
      };
      const analysis = await service.desktopKeywordAnalysis.analyzePaid(
        testKeyword,
        options
      );
      expectKeywordsMeta(analysis.meta, testKeyword, options);

      analysis.traffic_breakdown.forEach((datum) => {
        expect(datum.domain).toBeTruthy();
        expect(datum.traffic_share).toBeGreaterThan(0);
        expect(Number.isInteger(datum.position)).toBeTruthy();
        expect(datum.destination_url).toBeTruthy();
        expect(datum.website_categories).toBeTruthy();
      });

      done();
    });
  });
});

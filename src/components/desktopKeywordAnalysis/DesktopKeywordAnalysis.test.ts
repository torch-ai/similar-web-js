import { expectMeta, getService } from "../../Service.test";
import { DesktopKeywordAnalysis } from "./DesktopKeywordAnalysis";
import { IDesktopKeywordAnalysisCompetitorsParams } from "./DesktopKeywordAnalysis.types";

const service = getService();
const testDomain = "bbc.com";

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
      expectMeta(competitors.meta, testDomain, options);

      competitors.data.forEach((datum) => {
        expect(datum.score).toBeGreaterThanOrEqual(0);
        expect(datum.url).toBeTruthy();
      });

      done();
    });
  });
});

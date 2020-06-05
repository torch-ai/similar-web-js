import { expectWebsiteMeta, getService } from "../../Service.test";
import { DesktopWebTrafficSources } from "./DesktopWebTrafficSources";

const service = getService();
const testDomain = "bbc.com";

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
});

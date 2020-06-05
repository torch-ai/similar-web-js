import { IDateRange } from "../Component.types";
import Service from "../../Service";
import { MobileWebTrafficSources } from "./MobileWebTrafficSources";
import {
  expectChange,
  expectRankings,
  expectWebsiteMeta,
  getService,
} from "../../Service.test";
import { IMobileWebTrafficSourcesOverviewShareParams } from "./MobileWebTrafficSources.types";

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
  const earlier = new Date();
  earlier.setUTCMonth(earlier.getUTCMonth() - 3);
  const earlierThanThat = new Date();
  earlierThanThat.setUTCFullYear(
    earlier.getUTCFullYear() - 1,
    earlier.getUTCMonth()
  );
  const optionDates: IDateRange = {
    start_date: Service.formatDate(earlierThanThat, "month"),
    end_date: Service.formatDate(earlierThanThat, "month"),
  };

  it("should be an instance of MobileWebTrafficSources", () => {
    expect(service.mobileWebTrafficSources).toBeInstanceOf(
      MobileWebTrafficSources
    );
  });

  describe("overview share", () => {
    // TODO restore test once we get an answer back on why every site is 401 - Data not found
    it.skip("should get", async (done) => {
      const options: IMobileWebTrafficSourcesOverviewShareParams = {
        ...defaultOptions,
        granularity: "monthly",
      };
      const results = await service.mobileWebTrafficSources.overviewShare(
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
              expect(visits.visits).toBeGreaterThanOrEqual(0);
            });
          });
        });

      done();
    });
  });

  describe("referrals", () => {
    // TODO restore test once we get an answer back on why every site is 401 - Data not found
    it.skip("should get", async (done) => {
      const referrals = await service.mobileWebTrafficSources.referrals(
        testDomain,
        defaultOptions
      );

      expectWebsiteMeta(referrals.meta, testDomain, defaultOptions);
      expect(referrals.visits).toBeGreaterThanOrEqual(0);
      expectRankings(referrals);
      referrals.referrals.forEach((referral) => {
        expect(referral.share).toBeGreaterThan(0);
        expect(referral.domain).toBeTruthy();
        expectChange(referral);
      });

      done();
    });
  });
});

import {
  expectChange,
  expectWebsiteMeta,
  getService,
} from "../../Service.test";
import { DesktopWebTrafficSources } from "./DesktopWebTrafficSources";
import {
  IDesktopWebTrafficSourcesEngagementMetrics,
  IDesktopWebTrafficSourcesOverviewShareParams,
  IDesktopWebTrafficSourcesEngagementMetricsParams,
  IRankings,
  IDesktopWebTrafficSourcesSearchKeywordsParams,
  IDesktopWebTrafficSourcesSearchKeywords,
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

const expectRankings = (data: IRankings) => {
  expect(data.global_ranking).toBeGreaterThan(0);
  expect(data.category).toBeTruthy();
  expect(data.category_ranking).toBeGreaterThan(0);
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

      expect(results.visits).toBeGreaterThanOrEqual(0);
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
      const options: IDesktopWebTrafficSourcesEngagementMetricsParams = {
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
      const options: IDesktopWebTrafficSourcesEngagementMetricsParams = {
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

  describe("bounce rate", () => {
    it("should get", async (done) => {
      const options: IDesktopWebTrafficSourcesEngagementMetricsParams = {
        ...defaultOptions,
        granularity: "Monthly",
      };
      const results = await service.desktopWebTrafficSources.bounceRate(
        testDomain,
        options
      );

      expectWebsiteMeta(results.meta, testDomain, options);
      expectEngagementMetric(results);

      done();
    });
  });

  describe("social referrals", () => {
    it("should get", async (done) => {
      const referrals = await service.desktopWebTrafficSources.socialReferrals(
        testDomain,
        defaultOptions
      );

      expectWebsiteMeta(referrals.meta, testDomain, defaultOptions);
      expect(referrals.visits).toBeGreaterThanOrEqual(0);
      referrals.social.forEach((referral) => {
        expect(referral.page).toBeTruthy();
        expect(referral.share).toBeGreaterThan(0);
        expectChange(referral);
      });

      done();
    });
  });

  describe("referrals", () => {
    it("should get", async (done) => {
      const referrals = await service.desktopWebTrafficSources.referrals(
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

  describe("ad networks", () => {
    it("should get", async (done) => {
      const adNetworks = await service.desktopWebTrafficSources.adNetworks(
        testDomain,
        defaultOptions
      );

      expectWebsiteMeta(adNetworks.meta, testDomain, defaultOptions);
      expectRankings(adNetworks);
      adNetworks.ad_networks.forEach((adNetwork) => {
        expect(adNetwork.ad_network).toBeTruthy();
        expect(adNetwork.share).toBeGreaterThan(0);
        expectChange(adNetwork);
      });

      done();
    });
  });

  describe("publishers", () => {
    it("should get", async (done) => {
      const publishers = await service.desktopWebTrafficSources.publishers(
        testDomain,
        defaultOptions
      );

      expectWebsiteMeta(publishers.meta, testDomain, defaultOptions);
      expectRankings(publishers);
      expect(publishers.visits).toBeGreaterThan(0);
      publishers.publishers.forEach((adNetwork) => {
        expect(adNetwork.domain).toBeTruthy();
        expect(adNetwork.share).toBeGreaterThan(0);
        expectChange(adNetwork);
      });

      done();
    });
  });

  describe("search keywords", () => {
    const options: IDesktopWebTrafficSourcesSearchKeywordsParams = {
      ...defaultOptions,
      limit: 3,
    };

    const expectKeywords = (
      keywords: IDesktopWebTrafficSourcesSearchKeywords
    ) => {
      expectWebsiteMeta(keywords.meta, testDomain, options);
      expect(keywords.visits).toBeGreaterThanOrEqual(0);
      expect(keywords.total_visits).toBeGreaterThanOrEqual(0);
      keywords.search.forEach((search) => {
        expect(search.search_term).toBeTruthy();
        expect(search.share).toBeGreaterThan(0);
        expect(search.visits).toBeGreaterThan(0);
        expect(search.volume).toBeGreaterThan(0);
        expect(search.cpc).toBeGreaterThan(0);
        expect(search.url).toBeTruthy();
        expect(search.position).toBeGreaterThanOrEqual(0);
        expect(search.share).toBeGreaterThan(0);
        expectChange(search);
      });
    };

    it("should get organic", async (done) => {
      const keywords = await service.desktopWebTrafficSources.organicSearchKeywords(
        testDomain,
        options
      );
      expectKeywords(keywords);

      done();
    });

    it("should get paid", async (done) => {
      const keywords = await service.desktopWebTrafficSources.paidSearchKeywords(
        testDomain,
        options
      );
      expectKeywords(keywords);

      done();
    });
  });
});

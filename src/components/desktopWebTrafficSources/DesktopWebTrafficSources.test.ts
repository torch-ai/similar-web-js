import {
  expectChange,
  expectRankings,
  expectWebsiteMeta,
  getService,
} from "../../Service.test";
import { DesktopWebTrafficSources } from "./DesktopWebTrafficSources";
import {
  IDesktopWebTrafficSourcesEngagementMetrics,
  IDesktopWebTrafficSourcesOverviewShareParams,
  IDesktopWebTrafficSourcesEngagementMetricsParams,
  IDesktopWebTrafficSourcesKeywordsParams,
  IDesktopWebTrafficSourcesKeywords,
  IDesktopWebTrafficSourcesSearchVisitDistributionParams,
} from "./DesktopWebTrafficSources.types";
import { IDateRange } from "../Component.types";
import Service from "../../Service";

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

  it("should be an instance of DesktopWebTrafficSources", () => {
    expect(service.desktopWebTrafficSources).toBeInstanceOf(
      DesktopWebTrafficSources
    );
  });

  describe("overview", () => {
    it("should get", async () => {
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
    });
  });

  describe("overview share", () => {
    it("should get", async () => {
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
    });
  });

  describe("pages per visit", () => {
    it("should get", async () => {
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
    });
  });

  describe("average visit duration", () => {
    it("should get", async () => {
      const options: IDesktopWebTrafficSourcesEngagementMetricsParams = {
        ...defaultOptions,
        granularity: "Monthly",
      };
      const results =
        await service.desktopWebTrafficSources.averageVisitDuration(
          testDomain,
          options
        );

      expectWebsiteMeta(results.meta, testDomain, options);
      expectEngagementMetric(results);
    });
  });

  describe("bounce rate", () => {
    it("should get", async () => {
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
    });
  });

  describe("social referrals", () => {
    it("should get", async () => {
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
    });
  });

  describe("referrals", () => {
    it("should get", async () => {
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
    });
  });

  describe("ad networks", () => {
    it("should get", async () => {
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
    });
  });

  describe("publishers", () => {
    it("should get", async () => {
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
    });
  });

  describe("search keywords", () => {
    const options: IDesktopWebTrafficSourcesKeywordsParams = {
      ...defaultOptions,
      limit: 3,
    };

    const expectKeywords = (keywords: IDesktopWebTrafficSourcesKeywords) => {
      expectWebsiteMeta(keywords.meta, testDomain, options);
      expect(keywords.visits).toBeGreaterThanOrEqual(0);
      expect(keywords.total_visits).toBeGreaterThanOrEqual(0);
      keywords.search.forEach((search) => {
        expect(search.search_term).toBeTruthy();
        expect(search.share).toBeGreaterThan(0);
        expect(search.visits).toBeGreaterThan(0);
        expect(search.volume).toBeGreaterThanOrEqual(0);
        expect(search.cpc).toBeGreaterThanOrEqual(0);
        expect(search.url).toBeTruthy();
        expect(search.position).toBeGreaterThanOrEqual(0);
        expect(search.share).toBeGreaterThan(0);
        expectChange(search);
      });
    };

    it("should get organic", async () => {
      const keywords =
        await service.desktopWebTrafficSources.organicSearchKeywords(
          testDomain,
          options
        );
      expectKeywords(keywords);
    });

    it("should get paid", async () => {
      const keywords =
        await service.desktopWebTrafficSources.paidSearchKeywords(
          testDomain,
          options
        );
      expectKeywords(keywords);
    });

    it("should get branded", async () => {
      const keywords = await service.desktopWebTrafficSources.brandedKeywords(
        testDomain,
        options
      );
      expectKeywords(keywords);
    });

    it("should get non-branded", async () => {
      const keywords =
        await service.desktopWebTrafficSources.nonBrandedKeywords(
          testDomain,
          options
        );
      expectKeywords(keywords);
    });

    it("should get questions", async () => {
      const keywords = await service.desktopWebTrafficSources.questionsKeywords(
        testDomain,
        options
      );
      expectKeywords(keywords);
    });
  });

  describe("search visits distribution", () => {
    it("should get", async () => {
      const options: IDesktopWebTrafficSourcesSearchVisitDistributionParams = {
        ...defaultOptions,
        ...optionDates,
      };
      const distribution =
        await service.desktopWebTrafficSources.searchVisitsDistribution(
          testDomain,
          options
        );

      expectWebsiteMeta(distribution.meta, testDomain, options);
      distribution.data.forEach((distribution) => {
        expect(distribution.date).toBeTruthy();
        expect(distribution.total_search_visits).toBeGreaterThanOrEqual(0);
        expect(
          distribution.visits_distribution.organic_branded_visits
        ).toBeGreaterThanOrEqual(0);
        expect(
          distribution.visits_distribution.organic_non_branded_visits
        ).toBeGreaterThanOrEqual(0);
        expect(
          distribution.visits_distribution.paid_branded_visits
        ).toBeGreaterThanOrEqual(0);
        expect(
          distribution.visits_distribution.paid_non_branded_visits
        ).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("organic outgoing links", () => {
    it("should get", async () => {
      const referrals =
        await service.desktopWebTrafficSources.organicOutgoingLinks(
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
    });
  });

  describe("outgoing ad networks", () => {
    it("should get", async () => {
      const networks =
        await service.desktopWebTrafficSources.outgoingAdNetworks(
          testDomain,
          defaultOptions
        );

      expectWebsiteMeta(networks.meta, testDomain, defaultOptions);
      expectRankings(networks);
      networks.data.forEach((network) => {
        expect(network.share).toBeGreaterThan(0);
        expect(network.domain).toBeTruthy();
        expectChange(network);
      });
    });
  });

  describe("outgoing ad advertisers", () => {
    it("should get", async () => {
      const advertisers =
        await service.desktopWebTrafficSources.outgoingAdAdvertisers(
          testDomain,
          defaultOptions
        );

      expectWebsiteMeta(advertisers.meta, testDomain, defaultOptions);
      expect(advertisers.visits).toBeGreaterThanOrEqual(0);
      advertisers.advertisers.forEach((advertiser) => {
        expect(advertiser.share).toBeGreaterThan(0);
        expect(advertiser.domain).toBeTruthy();
        expectChange(advertiser);
      });
    });
  });
});

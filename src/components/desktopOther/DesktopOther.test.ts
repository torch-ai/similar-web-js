import { expectWebsiteMeta, getService } from "../../Service.test";
import Service from "../../Service";
import { DesktopOther } from "./DesktopOther";
import { IDesktopOtherTopSitesParams } from "./DesktopOther.types";
import { IDateRange } from "../Component.types";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.desktopOther", () => {
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
    start_date: Service.formatDate(earlierThanThat),
    end_date: Service.formatDate(earlierThanThat),
  };

  it("should be an instance of DesktopOther", () => {
    expect(service.desktopOther).toBeInstanceOf(DesktopOther);
  });

  describe("similar sites", () => {
    it("should get", async (done) => {
      const similarSites = await service.desktopOther.similarSites(testDomain);
      expectWebsiteMeta(similarSites.meta, testDomain);

      expect(similarSites.similar_sites.length).toBeGreaterThan(0);
      const similarSite = similarSites.similar_sites.shift();
      expect(similarSite.score).toBeGreaterThan(0);
      expect(similarSite.url).toBeTruthy();

      done();
    });
  });

  describe("audience interest", () => {
    it("should get", async (done) => {
      const options = {
        ...defaultOptions,
        ...optionDates,
      };
      const similarSites = await service.desktopOther.audienceInterests(
        testDomain,
        options
      );
      expectWebsiteMeta(similarSites.meta, testDomain, options);

      expect(similarSites.records.length).toBeGreaterThan(0);
      const record = similarSites.records.shift();
      expect(record.affinity).toBeGreaterThan(0);
      expect(record.overlap).toBeGreaterThan(0);
      expect(record.domain).toBeTruthy();
      expect(typeof record.has_adsense === "boolean").toBeTruthy();

      done();
    });
  });

  describe("audience interest", () => {
    it("should get", async (done) => {
      const options = {
        ...defaultOptions,
        ...optionDates,
      };
      const similarSites = await service.desktopOther.audienceInterests(
        testDomain,
        options
      );
      expectWebsiteMeta(similarSites.meta, testDomain, options);

      expect(similarSites.records.length).toBeGreaterThan(0);
      const record = similarSites.records.shift();
      expect(record.affinity).toBeGreaterThan(0);
      expect(record.overlap).toBeGreaterThan(0);
      expect(record.domain).toBeTruthy();
      expect(typeof record.has_adsense === "boolean").toBeTruthy();

      done();
    });
  });

  describe("category rank", () => {
    it("should get", async (done) => {
      const categoryRank = await service.desktopOther.categoryRank(testDomain);
      expectWebsiteMeta(categoryRank.meta, testDomain);

      expect(categoryRank.rank).toBeGreaterThan(0);
      expect(categoryRank.category).toBeTruthy();

      done();
    });
  });

  describe("top sites desktop", () => {
    it("should get", async (done) => {
      const options: IDesktopOtherTopSitesParams = {
        ...defaultOptions,
      };
      const category = "$All";
      const topSites = await service.desktopOther.topSitesDesktop(
        category,
        options
      );
      expectWebsiteMeta(topSites.meta, category, options);

      const desktopSite = topSites.top_sites.shift();
      expect(desktopSite.domain).toBeTruthy();
      expect(desktopSite.rank).toBeGreaterThan(0);

      done();
    });
  });

  describe("top sites mobile", () => {
    it("should get", async (done) => {
      const options: IDesktopOtherTopSitesParams = {
        ...defaultOptions,
      };
      const category = DesktopOther.All;
      const topSites = await service.desktopOther.topSitesMobile(
        category,
        options
      );
      expectWebsiteMeta(topSites.meta, category, options);

      const desktopSite = topSites.top_sites.shift();
      expect(desktopSite.domain).toBeTruthy();
      expect(desktopSite.rank).toBeGreaterThan(0);

      done();
    });
  });

  describe("api lite", () => {
    it("should get", async (done) => {
      const data = await service.desktopOther.apiLite(testDomain);

      expect(data.site_name).toBeTruthy();
      expect(typeof data.is_site_verified === "boolean").toBeTruthy();
      expect(data.category).toBeTruthy();
      expect(data.large_screenshot).toBeTruthy();
      expect(data.reach_months).toBeGreaterThanOrEqual(0);
      expect(data.data_months).toBeGreaterThanOrEqual(0);
      expect(data.global_rank.rank).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(data.global_rank.direction)).toBeTruthy();
      expect(data.country_rank.country).toBeGreaterThanOrEqual(0);
      expect(data.country_rank.rank).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(data.country_rank.direction)).toBeTruthy();
      expect(data.category_rank.category).toBeTruthy();
      expect(data.category_rank.rank).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(data.category_rank.direction)).toBeTruthy();
      expect(data.title).toBeTruthy();
      expect(data.description).toBeTruthy();
      expect(data.redirect_url).toBeTruthy();
      Object.keys(data.estimated_monthly_visits)
        .map((key) => data.estimated_monthly_visits[key])
        .forEach((visits) => {
          expect(visits).toBeGreaterThanOrEqual(0);
        });
      expect(data.engagments.year).toBeGreaterThanOrEqual(0);
      expect(data.engagments.month).toBeGreaterThanOrEqual(0);
      expect(data.engagments.visits).toBeGreaterThanOrEqual(0);
      expect(data.engagments.time_on_site).toBeGreaterThanOrEqual(0);
      expect(data.engagments.page_per_visit).toBeGreaterThanOrEqual(0);
      expect(data.engagments.bounce_rate).toBeGreaterThanOrEqual(0);
      data.top_country_shares.forEach((shares) => {
        expect(shares.country).toBeGreaterThanOrEqual(0);
        expect(shares.value).toBeGreaterThanOrEqual(0);
        expect(typeof shares.change === "number").toBeTruthy();
      });
      expect(data.traffic_sources.search).toBeGreaterThanOrEqual(0);
      expect(data.traffic_sources.social).toBeGreaterThanOrEqual(0);
      if (data.traffic_sources.paid_referrals) {
        expect(data.traffic_sources.paid_referrals).toBeGreaterThanOrEqual(0);
      }
      expect(data.traffic_sources.direct).toBeGreaterThanOrEqual(0);
      expect(data.traffic_sources.referrals).toBeGreaterThanOrEqual(0);
      expect(data.referrals_ratio).toBeGreaterThanOrEqual(0);
      data.top_referring.forEach((referring) => {
        expect(referring.site).toBeTruthy();
        expect(referring.value).toBeGreaterThanOrEqual(0);
        expect(typeof referring.change === "number").toBeTruthy();
      });
      expect(data.total_referring).toBeGreaterThanOrEqual(0);
      data.top_destinations.forEach((destination) => {
        expect(destination.site).toBeTruthy();
        expect(destination.value).toBeGreaterThanOrEqual(0);
        expect(typeof destination.change === "number").toBeTruthy();
      });
      expect(data.total_destinations).toBeGreaterThanOrEqual(0);
      expect(data.search_ratio).toBeGreaterThanOrEqual(0);
      data.top_organic_keywords.forEach((destination) => {
        expect(destination.keyword).toBeTruthy();
        expect(destination.value).toBeGreaterThanOrEqual(0);
        expect(typeof destination.change === "number").toBeTruthy();
      });
      data.top_paid_keywords.forEach((destination) => {
        expect(destination.keyword).toBeTruthy();
        expect(destination.value).toBeGreaterThanOrEqual(0);
        expect(typeof destination.change === "number").toBeTruthy();
      });
      expect(data.organic_keywords_rolling_unique_count).toBeGreaterThanOrEqual(
        0
      );
      expect(data.paid_keywords_rolling_unique_count).toBeGreaterThanOrEqual(0);
      expect(data.organic_search_share).toBeGreaterThanOrEqual(0);
      expect(data.paid_search_share).toBeGreaterThanOrEqual(0);
      expect(data.social_ratio).toBeGreaterThanOrEqual(0);
      data.top_social.forEach((destination) => {
        expect(destination.name).toBeTruthy();
        expect(destination.icon).toBeTruthy();
        expect(destination.site).toBeTruthy();
        expect(destination.value).toBeTruthy();
        expect(Number.isInteger(destination.change)).toBeTruthy();
      });
      expect(data.display_ads_ratio).toBeGreaterThanOrEqual(0);
      data.top_social.forEach((site) => {
        expect(site.site).toBeTruthy();
        expect(site.value).toBeGreaterThanOrEqual(0);
        expect(typeof site.change === "number").toBeTruthy();
      });
      data.top_ad_networks.forEach((site) => {
        expect(site.site).toBeTruthy();
        expect(site.value).toBeGreaterThanOrEqual(0);
        expect(typeof site.change === "number").toBeTruthy();
      });
      expect(data.incoming_ads_rolling_unique_count).toBeGreaterThanOrEqual(0);
      expect(data.also_visited_unique_count).toBeGreaterThanOrEqual(0);
      data.similar_sites.forEach((site) => {
        expect(site.site).toBeTruthy();
        expect(site.screenshot).toBeTruthy();
        expect(site.rank).toBeGreaterThanOrEqual(0);
      });
      data.similar_sites_by_rank.forEach((site) => {
        expect(site.site).toBeTruthy();
        expect(site.screenshot).toBeTruthy();
        expect(site.rank).toBeGreaterThanOrEqual(0);
      });
      Object.keys(data.mobile_apps)
        .map((key) => data.mobile_apps[key])
        .forEach((app) => {
          expect(app.app_id).toBeTruthy();
          expect(app.title).toBeTruthy();
          expect(app.cover).toBeTruthy();
          expect(app.author).toBeTruthy();
          expect(app.category).toBeTruthy();
          expect(app.price).toBeTruthy();
          expect(app.rating).toBeGreaterThanOrEqual(0);
          expect(app.rating_count).toBeGreaterThanOrEqual(0);
          expect(typeof app.valid === "boolean").toBeTruthy();
        });
      expect(data.daily_visits_min_date).toBeTruthy();
      expect(data.daily_visits_max_date).toBeTruthy();

      done();
    });
  });
});

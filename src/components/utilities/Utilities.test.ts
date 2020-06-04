import { getService } from "../../Service.test";
import { Utilities } from "./Utilities";
import { ICapabilitiesData } from "./Utilities.types";

const service = getService();

/**
 * The tests
 */
describe("service.utilities", () => {
  it("should be an instance of Utilities", () => {
    expect(service.utilities).toBeInstanceOf(Utilities);
  });

  describe("capabilities", () => {
    it("should get", async (done) => {
      const capabilities = await service.utilities.capabilities();
      expect(capabilities).toBeTruthy();
      expect(capabilities.remaining_hits).toBeGreaterThanOrEqual(0);

      const expectCapabilitiesData = (data: ICapabilitiesData) => {
        expect(data).toBeTruthy();
        expect(data.snapshot_interval).toBeTruthy();
        expect(data.snapshot_interval.end_date).toBeTruthy();
        expect(data.snapshot_interval.start_date).toBeTruthy();
        expect(data.countries.length).toBeGreaterThan(0);

        const country = data.countries.shift();
        expect(country.code).toBeTruthy();
        expect(country.name).toBeTruthy();
      };

      expectCapabilitiesData(capabilities.app_data);
      expectCapabilitiesData(capabilities.app_engagement_data);
      expectCapabilitiesData(capabilities.web_desktop_data);
      expectCapabilitiesData(capabilities.web_mobile_data);
      done();
    });
  });

  describe("categories", () => {
    it("should get", async (done) => {
      const categories = await service.utilities.categories();
      expect(categories).toBeTruthy();
      expect(categories.Arts_and_Entertainment).toBeTruthy();
      expect(categories.Business_and_Consumer_Services).toBeTruthy();
      expect(categories.Community_and_Society).toBeTruthy();
      expect(categories.Computers_Electronics_and_Technology).toBeTruthy();
      expect(categories["E-commerce_and_Shopping"]).toBeTruthy();
      expect(categories.Finance).toBeTruthy();
      expect(categories.Food_and_Drink).toBeTruthy();
      expect(categories.Gambling).toBeTruthy();
      expect(categories.Games).toBeTruthy();
      expect(categories.Health).toBeTruthy();
      expect(categories.Heavy_Industry_and_Engineering).toBeTruthy();
      expect(categories.Hobbies_and_Leisure).toBeTruthy();
      expect(categories.Home_and_Garden).toBeTruthy();
      expect(categories.Jobs_and_Career).toBeTruthy();
      expect(categories.Law_and_Government).toBeTruthy();
      expect(categories.Lifestyle).toBeTruthy();
      expect(categories.News_and_Media).toBeTruthy();
      expect(categories.Pets_and_Animals).toBeTruthy();
      expect(categories.Reference_Materials).toBeTruthy();
      expect(categories.Science_and_Education).toBeTruthy();
      expect(categories.Sports).toBeTruthy();
      expect(categories.Travel_and_Tourism).toBeTruthy();
      expect(categories.Vehicles).toBeTruthy();
      expect(categories.Adult).toBeTruthy();

      done();
    });
  });
});

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
});

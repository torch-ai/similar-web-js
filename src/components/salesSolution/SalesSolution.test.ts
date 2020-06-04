import { getService } from "../../Service.test";
import { SalesSolution } from "./SalesSolution";

const service = getService();
const testDomain = "bbc.com";

/**
 * The tests
 */
describe("service.salesSolution", () => {
  it("should be an instance of SalesSolution", () => {
    expect(service.salesSolution).toBeInstanceOf(SalesSolution);
  });

  describe("technographics", () => {
    // At the time of writing, this was returning 403 Forbidden for my login
    it.skip("should get", async (done) => {
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

      done();
    });
  });
});

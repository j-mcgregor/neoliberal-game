import { describe, it, expect } from "bun:test";
import { categoriesAndTech } from "..";

// validateCompanySizeDistribution.ts
function validateCompanySizeDistribution(data: any): boolean {
  const companySizeCount: { [size: number]: number } = {};

  // Iterate through each group and category
  for (const group in data) {
    for (const category in data[group]) {
      for (const version in data[group][category]) {
        const companySize = data[group][category][version].company_size;

        // Increment the count for the corresponding company size
        if (companySizeCount[companySize]) {
          companySizeCount[companySize]++;
        } else {
          companySizeCount[companySize] = 1;
        }
      }
    }
  }

  // Validate that each company size has exactly 12 technologies
  for (let size = 1; size <= 10; size++) {
    const count = companySizeCount[size] || 0;
    console.log("companySizeCount :>> ", companySizeCount);
    if (count !== 12) {
      console.error(
        `Company size ${size} has ${count} technologies, expected 12.`
      );
      return false;
    }
  }

  return true;
}

describe("Company Size Distribution Validation", () => {
  it("should have exactly 12 technologies for each company size from 1 to 10", () => {
    const result = validateCompanySizeDistribution(categoriesAndTech);
    expect(result).toBe(true);
  });
});

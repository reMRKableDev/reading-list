const isNotNumber = require("../isNotNumber.helper");

const { validateBooleanValues } = require("../../../utils/validators");

describe("isNotNumber helper function unit tests", () => {
  it("should validate string type as true", () => {
    validateBooleanValues(isNotNumber("dummy"), true);
  });

  it("should validate number type as false", () => {
    validateBooleanValues(isNotNumber(1), false);
  });
});

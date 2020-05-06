const isObjectPropertyEmpty = require("../isObjectPropertyEmpty.helper");

const {
  validateTruthiness,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("isNotNumber helper function unit tests", () => {
  it("should validate incoming module truthiness", () => {
    validateTruthiness(isObjectPropertyEmpty);
  });

  it("should validate string type as true", () => {
    validateBooleanValues(isObjectPropertyEmpty({ id: "" }), true);
  });

  it("should validate number type as false", () => {
    validateBooleanValues(isObjectPropertyEmpty({ id: 1 }), false);
  });
});

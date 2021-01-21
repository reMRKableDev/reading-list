const isObjectPropertyEmpty = require("../isObjectPropertyEmpty.helper");

const {
  validateTruthiness,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("isObjectPropertyEmpty helper function unit tests", () => {
  it("should validate incoming module truthiness", () => {
    validateTruthiness(isObjectPropertyEmpty);
  });

  it("should validate object with empty field as true", () => {
    validateBooleanValues(isObjectPropertyEmpty({ id: "" }), true);
  });

  it("should validate object with non-empty field as false", () => {
    validateBooleanValues(isObjectPropertyEmpty({ id: 1 }), false);
  });
});

const isObjectEmpty = require("../isObjectEmpty.helper");

const {
  validateTruthiness,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("isNotNumber helper function unit tests", () => {
  it("should validate incoming module truthiness", () => {
    validateTruthiness(isObjectEmpty);
  });

  it("should validate string type as true", () => {
    validateBooleanValues(isObjectEmpty({}), true);
  });

  it("should validate number type as false", () => {
    validateBooleanValues(isObjectEmpty({ id: 1 }), false);
  });
});

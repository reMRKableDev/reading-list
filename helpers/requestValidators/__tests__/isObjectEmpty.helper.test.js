const isObjectEmpty = require("../isObjectEmpty.helper");

const {
  validateTruthiness,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("isObjectEmpty helper function unit tests", () => {
  it("should validate incoming module truthiness", () => {
    validateTruthiness(isObjectEmpty);
  });

  it("should validate empty object as true", () => {
    validateBooleanValues(isObjectEmpty({}), true);
  });

  it("should validate non-empty object as false", () => {
    validateBooleanValues(isObjectEmpty({ id: 1 }), false);
  });
});

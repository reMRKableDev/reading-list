const config = require("../db.config");

const {
  validateTruthiness,
  validateObjectDataType,
} = require("../../../utils/validators");

describe("Database configuration unit tests", () => {
  it("it should validate truthiness", () => {
    validateTruthiness(config);
  });

  it("it should validate configuration as an object", () => {
    validateObjectDataType(config);
  });
});

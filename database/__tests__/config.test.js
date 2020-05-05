/**
 * @const config                Database configuration
 * @requires db.config.js
 */
const config = require("../configs/db.config");

/**
 * @const {Object} validators
 * @type {function}             validateTruthiness
 * @type {function}             validateObjectDataType
 */
const {
  validateTruthiness,
  validateObjectDataType,
} = require("../../utils/validators");

/**
 * Unit test blocks
 * @method describe
 * @method *it
 */
describe("Database configuration unit tests", () => {
  it("it should validate truthiness", () => {
    validateTruthiness(config);
  });

  it("it should validate configuration as an object", () => {
    validateObjectDataType(config);
  });
});

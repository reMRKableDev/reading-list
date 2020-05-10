const app = require("../app");

const { validateTruthiness } = require("../utils/validators");

test("should validate that app.js is not empty ", () => {
  validateTruthiness(app);
});

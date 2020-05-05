/* require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock("dbName", "dbUser", "dbPwd", {});

const supertest = require("supertest");

const app = require("../app");

const request = supertest(app);

const { validateTruthiness } = require("../utils/validators");

describe("app.js unit tests", () => {
  it("should validate the app.js is not empty", () => {
    validateTruthiness(app);
  });
}); */

test("sanity", () => {
  expect(1).toBe(1);
});

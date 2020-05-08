require("iconv-lite").encodingExists("foo");

jest.mock("../../helpers/crudOperations/findOrCreate.helper");

jest.mock("../../helpers/requestValidators/isObjectEmpty.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/requestValidators/isObjectPropertyEmpty.helper", () =>
  jest.fn(() => false)
);

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const findOrCreate = require("../../helpers/crudOperations/findOrCreate.helper");

const isObjectEmpty = require("../../helpers/requestValidators/isObjectEmpty.helper");

const isObjectPropertyEmpty = require("../../helpers/requestValidators/isObjectPropertyEmpty.helper");

const bookController = require("../book.controllers");

const readingListController = require("../readingList.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controller unit tests", () => {
  describe("createNewBook controller: create new book unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        title: "4-Hour Workweek",
        author: "Tim Ferris",
        readingListId: 1,
      };
      res = mockResponse();
      await bookController.createNewBook(req, res);
    });

    it("should check all validations and call findOrCreate", () => {
      validateNumberOfMockCalls(isObjectEmpty, 1);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 1);
      validateNumberOfMockCalls(findOrCreate, 1);
    });
  });

  describe("createNewReadingList controller: create new reading list unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        name: "Productivity",
        type: "fiction",
      };
      res = mockResponse();
      await readingListController.createNewReadingList(req, res);
    });

    it("should check all validations and call findOrCreate", () => {
      validateNumberOfMockCalls(isObjectEmpty, 2);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 2);
      validateNumberOfMockCalls(findOrCreate, 2);
    });
  });
});

jest.mock("../../helpers/requestValidators/isObjectPropertyEmpty.helper", () =>
  jest.fn(() => true)
);

jest.mock("../../helpers/requestValidators/isObjectEmpty.helper");

jest.mock("../../helpers/crudOperations/findOrCreate.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isObjectPropertyEmpty = require("../../helpers/requestValidators/isObjectPropertyEmpty.helper");

const isObjectEmpty = require("../../helpers/requestValidators/isObjectEmpty.helper");

const findOrCreate = require("../../helpers/crudOperations/findOrCreate.helper");

const bookController = require("../book.controllers");

const readingList = require("../readingList.controllers");

const {
  validateNumberOfMockCalls,
  validateToHaveBeenCalledWithBadRequest,
} = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("createNewBook controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = { title: "", author: "Tim Ferris", readingListId: 1 };
      res = mockResponse();
      await bookController.createNewBook(req, res);
    });

    it("should validate the existence empty property in incoming object", () => {
      validateNumberOfMockCalls(isObjectEmpty, 1);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 1);
      validateNumberOfMockCalls(findOrCreate, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });
  });

  describe("createNewReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = { title: "", author: "Tim Ferris", readingListId: 1 };
      res = mockResponse();
      await readingList.createNewReadingList(req, res);
    });

    it("should validate the existence empty property in incoming object", () => {
      validateNumberOfMockCalls(isObjectEmpty, 3);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 3);
      validateNumberOfMockCalls(findOrCreate, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });
  });
});

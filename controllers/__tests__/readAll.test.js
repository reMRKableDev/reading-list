jest.mock("../../helpers/crudOperations/findAll.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const findAll = require("../../helpers/crudOperations/findAll.helper");

const bookController = require("../book.controllers");

const readingListController = require("../readingList.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controller: findAll() unit tests", () => {
  describe("readAllBooks controller: read all books unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await bookController.readAllBooks(req, res);
    });

    it("should call findAll", () => {
      validateNumberOfMockCalls(findAll, 1);
    });
  });

  describe("readAllReadingLists controller: read unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await readingListController.readAllReadingLists(req, res);
    });

    it("should call findAll", () => {
      validateNumberOfMockCalls(findAll, 2);
    });
  });
});

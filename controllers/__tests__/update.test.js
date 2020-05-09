jest.mock("../../helpers/requestValidators/isObjectPropertyEmpty.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/requestValidators/isObjectEmpty.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/crudOperations/update.helper");

jest.mock("../../helpers/crudOperations/updateBookReadingListId.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isObjectEmpty = require("../../helpers/requestValidators/isObjectEmpty.helper");

const isObjectPropertyEmpty = require("../../helpers/requestValidators/isObjectPropertyEmpty.helper");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const update = require("../../helpers/crudOperations/update.helper");

const updateBookReadingListId = require("../../helpers/crudOperations/updateBookReadingListId.helper");

const bookController = require("../book.controllers");

const readingListController = require("../readingList.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("updateBook controller: modify title unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        title: "Tools of Titans",
      };
      res = mockResponse();
      await bookController.updateBook(req, res);
    });

    it("should check all validations and call update", () => {
      validateNumberOfMockCalls(isObjectEmpty, 1);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 1);
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(update, 1);
      validateNumberOfMockCalls(updateBookReadingListId, 0);
    });
  });

  describe("updateBook controller: modify author unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        author: "Tim Ferris",
      };
      res = mockResponse();
      await bookController.updateBook(req, res);
    });

    it("should check all validations and call update", () => {
      validateNumberOfMockCalls(isObjectEmpty, 2);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 2);
      validateNumberOfMockCalls(isNotNumber, 2);
      validateNumberOfMockCalls(update, 2);
      validateNumberOfMockCalls(updateBookReadingListId, 0);
    });
  });

  describe("updateBook controller: modify readingListId unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        readingListId: 1,
      };
      res = mockResponse();
      await bookController.updateBook(req, res);
    });

    it("should check all validations and call updateBookReadingListId", () => {
      validateNumberOfMockCalls(isObjectEmpty, 3);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 3);
      validateNumberOfMockCalls(isNotNumber, 3);
      validateNumberOfMockCalls(updateBookReadingListId, 1);
    });
  });

  describe("createNewReadingList controller: modify name unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        name: "Fitness",
      };
      res = mockResponse();
      await readingListController.updateReadingList(req, res);
    });

    it("should check all validations and call update", () => {
      validateNumberOfMockCalls(isObjectEmpty, 4);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 4);
      validateNumberOfMockCalls(isNotNumber, 4);
      validateNumberOfMockCalls(update, 3);
    });
  });
  describe("createNewReadingList controller: modify type unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        type: "fiction",
      };
      res = mockResponse();
      await readingListController.updateReadingList(req, res);
    });

    it("should check all validations and call update", () => {
      validateNumberOfMockCalls(isObjectEmpty, 5);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 5);
      validateNumberOfMockCalls(isNotNumber, 5);
      validateNumberOfMockCalls(update, 4);
    });
  });
});

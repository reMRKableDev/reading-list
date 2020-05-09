jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/crudOperations/destroy.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const destroy = require("../../helpers/crudOperations/destroy.helper");

const bookController = require("../book.controllers");

const readingListController = require("../readingList.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("readOneBook controller: not a number unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await bookController.deleteBook(req, res);
    });

    it("should check NaN validations and call destroy", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(destroy, 1);
    });
  });

  describe("readOneReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await readingListController.deleteReadingList(req, res);
    });

    it("should check NaN validations and call destroy", () => {
      validateNumberOfMockCalls(isNotNumber, 2);
      validateNumberOfMockCalls(destroy, 2);
    });
  });
});

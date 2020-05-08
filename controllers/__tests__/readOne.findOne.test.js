jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/crudOperations/findOne.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const findOne = require("../../helpers/crudOperations/findOne.helper");

const bookController = require("../book.controllers");

const readingList = require("../readingList.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("readOneBook controller: not a number unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await bookController.readOneBook(req, res);
    });

    it("should check NaN validations and call findOne", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(findOne, 1);
    });
  });

  describe("readOneReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await readingList.readOneReadingList(req, res);
    });

    it("should check NaN validations and call findOne", () => {
      validateNumberOfMockCalls(isNotNumber, 2);
      validateNumberOfMockCalls(findOne, 2);
    });
  });
});

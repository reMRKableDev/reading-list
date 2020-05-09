jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => false)
);

jest.mock("../../helpers/crudOperations/findAllBooksInReadingList.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const findAllBooksInReadingList = require("../../helpers/crudOperations/findAllBooksInReadingList.helper");

const bookController = require("../book.controllers");

const { validateNumberOfMockCalls } = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("readAllBooksInReadingList controller: not a number unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await bookController.readAllBooksInReadingList(req, res);
    });

    it("should run NaN validation and call findAllBooks", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(findAllBooksInReadingList, 1);
    });
  });
});

jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => true)
);

jest.mock("../../helpers/crudOperations/findAllBooksInReadingList.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const findAllBooksInReadingList = require("../../helpers/crudOperations/findAllBooksInReadingList.helper");

const bookController = require("../book.controllers");

const {
  validateSendMockCalls,
  validateNumberOfMockCalls,
  validateNaNResponseMessage,
  validateToHaveBeenCalledWithBadRequest,
} = require("../../utils/validators");

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

    it("should validate that incoming req.params.id is not a number", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(findAllBooksInReadingList, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls[0][0];
      validateNaNResponseMessage(message);
    });
  });
});

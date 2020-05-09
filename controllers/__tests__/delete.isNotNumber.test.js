jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => true)
);

jest.mock("../../helpers/crudOperations/destroy.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const destroy = require("../../helpers/crudOperations/destroy.helper");

const bookController = require("../book.controllers");

const readingListController = require("../readingList.controllers");

const {
  validateSendMockCalls,
  validateNumberOfMockCalls,
  validateNaNResponseMessage,
  validateToHaveBeenCalledWithBadRequest,
} = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("readOneBook controller: not a number unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await bookController.deleteBook(req, res);
    });

    it("should validate that incoming req.params.id is not a number", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(destroy, 0);
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

  describe("readOneReadingList controller: not a number unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await readingListController.deleteReadingList(req, res);
    });

    it("should validate that incoming req.params.id is not a number", () => {
      validateNumberOfMockCalls(isNotNumber, 4);
      validateNumberOfMockCalls(destroy, 0);
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

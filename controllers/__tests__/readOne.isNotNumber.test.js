jest.mock("../../helpers/requestValidators/isNotNumber.helper", () =>
  jest.fn(() => true)
);

jest.mock("../../helpers/crudOperations/findOne.helper");

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const findOne = require("../../helpers/crudOperations/findOne.helper");

const bookController = require("../book.controllers");

const readingList = require("../readingList.controllers");

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
      await bookController.readOneBook(req, res);
    });

    it("should validate that incoming req.params.id is not a number", () => {
      validateNumberOfMockCalls(isNotNumber, 1);
      validateNumberOfMockCalls(findOne, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls.flat()[0];
      validateNaNResponseMessage(message);
    });
  });

  describe("readOneReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.params.id = "dummy";
      res = mockResponse();
      await readingList.readOneReadingList(req, res);
    });

    it("should validate that incoming req.params.id is not a number", () => {
      validateNumberOfMockCalls(isNotNumber, 4);
      validateNumberOfMockCalls(findOne, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls.flat()[0];
      validateNaNResponseMessage(message);
    });
  });
});

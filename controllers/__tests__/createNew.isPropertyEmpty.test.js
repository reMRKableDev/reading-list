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
  validateSendMockCalls,
  validateNumberOfMockCalls,
  validateEmptyPropertyResponseMessage,
  validateToHaveBeenCalledWithBadRequest,
} = require("../../utils/validators");

let req;
let res;

describe("Controllers unit tests", () => {
  describe("createNewBook controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
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

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls[0][0];
      validateEmptyPropertyResponseMessage(message);
    });
  });

  describe("createNewReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await readingList.createNewReadingList(req, res);
    });

    it("should validate the existence empty property in incoming object", () => {
      validateNumberOfMockCalls(isObjectEmpty, 4);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 4);
      validateNumberOfMockCalls(findOrCreate, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls[0][0];
      validateEmptyPropertyResponseMessage(message);
    });
  });
});

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

const { mockRequest, mockResponse } = require("../../utils/interceptor");

const isObjectEmpty = require("../../helpers/requestValidators/isObjectEmpty.helper");

const isObjectPropertyEmpty = require("../../helpers/requestValidators/isObjectPropertyEmpty.helper");

const isNotNumber = require("../../helpers/requestValidators/isNotNumber.helper");

const update = require("../../helpers/crudOperations/update.helper");

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
    });
  });

  /*   describe("updateBook controller: modify readingListId unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      req.body = {
        readingListId: 1,
      };
      res = mockResponse();
      await bookController.updateBook(req, res);
    });

    it("should check all validations and call update", () => {
      validateNumberOfMockCalls(isObjectEmpty, 3);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 3);
      validateNumberOfMockCalls(isNotNumber, 3);
      validateNumberOfMockCalls(update, 3);
    });
  });
 */
  /*   describe("createNewReadingList controller: empty object unit test", () => {
    beforeEach(async () => {
      req = mockRequest();
      res = mockResponse();
      await readingList.updateReadingList(req, res);
    });

    it("should validate the incoming empty object", () => {
      validateNumberOfMockCalls(isObjectEmpty, 4);
      validateNumberOfMockCalls(isObjectPropertyEmpty, 4);
      validateNumberOfMockCalls(isNotNumber, 0);
      validateNumberOfMockCalls(update, 0);
    });

    it("should return 400 status code", () => {
      validateToHaveBeenCalledWithBadRequest(res.status);
    });

    it("should validate the message sent by res.send", () => {
      validateSendMockCalls(res.send, 1);
      const { message } = res.send.mock.calls[0][0];
      validateEmptyPropertyResponseMessage(message);
    });
  }); */
});
